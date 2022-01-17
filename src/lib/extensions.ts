import { copy, duplicate } from '.'
import { apply, cut, filter, sort } from './algorithms'
import { _if, check } from './conditional'
import { Serie } from './serie'

// Based on this doc: https://www.typescriptlang.org/docs/handbook/declaration-merging.html#disallowed-merges

declare module "./serie" {
    interface Serie {
        apply(fn: Function)
        cut(fn: Function)
        filter(fn: Function)
        sort(fn: Function)
        check(fn: Function)
        _if(check: Function, True: Function, False: Function)
        isNaN()
        copy(to: Serie)
        duplicate()
    }
}
export {}

Serie.prototype.apply = function (fn: Function) { return apply(this, fn) }
Serie.prototype.cut = function (fn: Function) { return cut(this, fn) }
Serie.prototype.filter = function (fn: Function) { return filter(this, fn) }
Serie.prototype.sort = function (fn: Function) { return sort(this, fn) }

Serie.prototype.check = function (fn: Function) { return check(this, fn) }
Serie.prototype._if = function (check: Function, True: Function, False: Function) { return _if(this, check, True, False) }
Serie.prototype.isNaN = function () { return isNaN(this) }

Serie.prototype.copy = function (to: Serie) { return copy(this, to) }
Serie.prototype.duplicate = function () { return duplicate(this) }
