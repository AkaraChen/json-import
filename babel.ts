import type babel from "@babel/core";
import type { PluginObj } from "@babel/core";

export default function plugin({ types: t }: typeof babel): PluginObj {
    return {
        visitor: {
            ImportDeclaration(path, state) {
                const { node } = path;
                // only handle json import
                if (
                    !node.source.value.endsWith(".json") &&
                    !(node.assertions?.at(0)?.value?.value === "json")
                ) return;
                // `import { createProxy } from 'json-import'` if not imported
                if (!state.file.path.scope.hasBinding("createProxy")) {
                    path.insertBefore(
                        t.importDeclaration(
                            [
                                t.importSpecifier(
                                    t.identifier("createProxy"),
                                    t.identifier("createProxy")
                                ),
                            ],
                            t.stringLiteral("json-import")
                        )
                    );
                }
                // insert proxy declaration
                path.insertAfter(
                    t.variableDeclaration("const", [
                        t.variableDeclarator(
                            t.identifier(node.specifiers[0].local.name),
                            t.callExpression(
                                t.identifier("createProxy"),
                                [t.stringLiteral(node.source.value)]
                            )
                        ),
                    ])
                );
                // delete `import json from './test.json' assert { type: 'json' };`
                path.remove();
            },
        },
    };
}
