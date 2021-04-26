import { IArray } from "../serie"
import { minMaxArray, scaleArray } from "../utils"

export enum InterpolateDirection {
    INCREASING,
    DECREASING
}

export function meshInterpolate(
    {
        attribute, 
        topology, 
        size=3, 
        direction = InterpolateDirection.INCREASING
    } : {
        attribute : IArray, 
        topology  : IArray,
        size?: number,
        direction?: InterpolateDirection
    }): IArray
{
    let topo = undefined
    if (attribute === undefined) {
        console.warn('Cannot meshInterpolate, attribute is undefined')
        return undefined
    }
    if (attribute.length === 0) {
        console.warn('Cannot meshInterpolate, attribute is empty')
        return undefined
    }
    if (topology === undefined) {
        console.warn('Cannot meshInterpolate, attribute is topology')
        return undefined
    }
    if (topology.length === 0) {
        console.warn('Cannot meshInterpolate, topology is empty')
        return undefined
    }

    if (typeof topology[0] === 'number') {
        // Humm, better to use [[], []...]
        // Have to use size to know the chunk size in topology
        topo = []
        if (topology.length % size !== 0) {
            throw new Error(`Cannot meshInterpolate, topology (of size ${topology.length}) is not divisable by ${size}`)
        }
        for (let i=0; i<topology.length; i+= size) {
            const a: Array<number> = []
            for (let j=0; j<size; ++j) {
                a.push(topology[i+j])
            }
            topo.push(a)
        }
    } else {
        topo = topology
    }

    switch(direction) {
        //case InterpolateDirection.INCREASING: return interpolateIncreasingCombels({from: attribute, topology: topo})
        //case InterpolateDirection.DECREASING: return interpolateDecreasingCombels({from: attribute, topology: topo})
    }
}






// P R I V A T E  starting from here


function getMinMax(topology: Array<Array<number>>) {
    const minMax = [Infinity, -Infinity]
    topology.forEach( combel => {
        const m = minMaxArray(combel)
        minMax[0] = Math.min(minMax[0], m[0])
        minMax[1] = Math.max(minMax[1], m[1])
    })
    return minMax
}

function interpolateIncreasingCombels(
    {from, topology}:
    {
        from     : Array<any>,
        topology : Array<Array<number>>
    }): Array<any>
{
    let minMax = getMinMax(topology)
    if (minMax[0]<0) {
        throw new Error(`Topology contains negatif indices`)
    }

    let a = from[0]
    if ( !(typeof a === 'number')) {
        a = a.slice().fill(0)
    } else {
        a = 0
    }

    const to = new Array(topology.length).fill(a)

    if (typeof a === 'number') {
        topology.forEach( (combel, index) => {
            to[index] = (combel.reduce( (v, i) => v + from[i]))/combel.length
        })
    }
    else {
        topology.forEach( (combel, index) => {
            let sum = a.slice()
            combel.forEach( index => {
                const b = from[index]
                sum = sum.map( (num:number, idx: number) => num + b[idx] )
            })
            to[index] = scaleArray(sum, 1/combel.length)
        })
    }

    return to
}

function interpolateDecreasingCombels(
    {from, topology}:
    {
        from     : Array<any>, 
        topology : Array<Array<number>>
    }): Array<any>
{
    let minMax = getMinMax(topology)

    //const minMax = topology.reduce( combel => minMaxArray(combel) )
    if (minMax[0]<0) {
        throw new Error(`Topology contains negatif indices`)
    }

    let a = from[0]
    let size = 1
    let to: Array<any> = undefined
    if ( !(typeof a === 'number')) {
        a = a.slice().fill(0)
        size = a.length
        to = new Array(minMax[1]+1).fill(undefined).map(_ => a.slice())
    } else {
        a = 0
        to = new Array(minMax[1]+1).fill(0)
    }

    const nbr = new Array(to.length).fill(0)

    if (typeof a === 'number') {
        topology.forEach( (idNodes, idFace) => {
            const v = from[idFace]
            idNodes.forEach( id => {
                to[id] += v
                nbr[id]++
            })
        })
        for (let i=0; i<to.length; ++i) {
            to[i] /= nbr[i]
        }
    } else {
        //console.log(to)
        topology.forEach( (idNodes, idFace) => {
            const v = from[idFace]
            idNodes.forEach( id => {
                const vv = to[id]
                for (let i=0; i<size; ++i) vv[i] += v[i]
                nbr[id]++
                //console.log(id, to)
            })
        })
        for (let j=0; j<to.length; ++j) {
            for (let i=0; i<size; ++i) to[j][i] /= nbr[j]
        }
        //console.log(to)
    }

    return to
}
