import shutil
from pathlib import Path

from youwol.pipelines.pipeline_typescript_weback_npm import (
    Template,
    PackageType,
    Dependencies,
    RunTimeDeps,
    generate_template,
    Bundles,
    MainModule,
)
from youwol.utils import parse_json

folder_path = Path(__file__).parent

pkg_json = parse_json(folder_path / "package.json")


template = Template(
    path=folder_path,
    type=PackageType.Library,
    name=pkg_json["name"],
    version=pkg_json["version"],
    shortDescription=pkg_json["description"],
    author=pkg_json["author"],
    dependencies=Dependencies(runTime=RunTimeDeps(externals={}), devTime={}),
    bundles=Bundles(
        mainModule=MainModule(entryFile="./lib/index.ts", loadDependencies=[])
    ),
    userGuide=True,
)

generate_template(template)

shutil.copyfile(
    src=folder_path / ".template" / "src" / "auto-generated.ts",
    dst=folder_path / "src" / "auto-generated.ts",
)
for file in [
    ".gitignore",
    "README.md",
    ".npmignore",
    ".prettierignore",
    "LICENSE",
    "package.json",
    "tsconfig.json",
    "webpack.config.ts",
    #  'typedoc.js'
]:
    shutil.copyfile(src=folder_path / ".template" / file, dst=folder_path / file)
