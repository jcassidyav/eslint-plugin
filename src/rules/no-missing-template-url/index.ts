import { createESLintRule } from "../utils";
import * as fs from "fs";
import * as path from "path";

export type Options = [];

export type MessageIds = "noMissingTemplateUrl";

export default createESLintRule<Options, MessageIds>({
    name: "no-missing-template-url",
    meta: {
        type: "suggestion",
        docs: {
            description: "Ensure templateUrl points to an existing file with the correct case",
            recommended: "error",
        },
        messages: {
            noMissingTemplateUrl: "'{{templateUrl}}' file not found/case incorrect.",
        },
        schema: [{}],
        fixable: "code",
    },
    defaultOptions: [],
    create(context) {
        return {
            Decorator: (node) => {
                if (context === undefined) return;
                // do nothing
                const expr = node.expression as any;
                if (expr.callee?.name === "Component") {
                    const properties = expr.arguments[0].properties;

                    for (const property of properties) {
                        if (
                            property.type === "Property" &&
                            property.key.type === "Identifier" &&
                            property.key.name === "templateUrl"
                        ) {
                            if (property.value.type === "Literal") {
                                const templateUrl = property.value.value as string;
                                const currentfileName = context.getPhysicalFilename?.();
                                if (currentfileName) {
                                    const dir = path.dirname(currentfileName);
                                    const templatePath = path.resolve(dir, templateUrl);
                                    if (!fileExistsWithCaseSync(templatePath)) {
                                        context.report({
                                            node: property,
                                            messageId: "noMissingTemplateUrl",
                                            data: {
                                                templateUrl,
                                            },
                                        });
                                    }
                                }
                            }
                        }
                    }
                }
            },
        };
    },
});

function fileExistsWithCaseSync(filepath) {
    const dir = path.dirname(filepath);
    if (dir === path.dirname(dir)) {
        return true;
    }
    const filenames = fs.readdirSync(dir);
    if (filenames.indexOf(path.basename(filepath)) === -1) {
        return false;
    }
    return fileExistsWithCaseSync(dir);
}
