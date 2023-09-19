import noDuplicateNsImports from "./no-duplicate-ns-imports";
import noNativescriptAngularImports from "./no-nativescript-angular-imports";
import noTnsCoreModulesImports from "./no-tns-core-modules-imports";
import noMissingTemplateUrl from "./no-missing-template-url";

export const rules = {
    "no-duplicate-ns-imports": noDuplicateNsImports,
    "no-nativescript-angular-imports": noNativescriptAngularImports,
    "no-tns-core-modules-imports": noTnsCoreModulesImports,
    "no-missing-template-url": noMissingTemplateUrl,
};

export const recommendedRules = {
    "@nativescript/no-duplicate-ns-imports": "warn",
    "@nativescript/no-nativescript-angular-imports": "warn",
    "@nativescript/no-tns-core-modules-imports": "warn",
    "@nativescript/no-missing-template-url": "error",
};
