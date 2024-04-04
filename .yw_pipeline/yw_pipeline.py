from youwol.app.environment import YouwolEnvironment
from youwol.app.routers.projects import IPipelineFactory, JsBundle, Link
from youwol.pipelines.pipeline_typescript_weback_npm import pipeline, PipelineConfig
from youwol.utils.context import Context


class PipelineFactory(IPipelineFactory):

    def __init__(self, **kwargs):
        super().__init__(**kwargs)

    async def get(self, _env: YouwolEnvironment, context: Context):
        config = PipelineConfig(target=JsBundle(
            links=[
                Link(name="doc", url="dist/docs/index.html"),
                Link(name="coverage", url="coverage/lcov-report/index.html"),
                Link(name="bundle-analysis", url="dist/bundle-analysis.html")
            ]
        ))
        return await pipeline(config, context)
