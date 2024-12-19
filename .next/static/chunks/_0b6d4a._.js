(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push(["static/chunks/_0b6d4a._.js", {

"[project]/src/app/page.tsx [app-rsc] (ecmascript, Next.js server component, client modules)": ((__turbopack_context__) => {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, t: __turbopack_require_real__ } = __turbopack_context__;
{
}}),
"[project]/node_modules/next/navigation.js [app-client] (ecmascript)": (function(__turbopack_context__) {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, m: module, e: exports, t: __turbopack_require_real__ } = __turbopack_context__;
{
module.exports = __turbopack_require__("[project]/node_modules/next/dist/client/components/navigation.js [app-client] (ecmascript)");
}}),
"[project]/node_modules/@vercel/speed-insights/dist/next/index.mjs [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "SpeedInsights": (()=>SpeedInsights2)
});
// src/nextjs/index.tsx
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
// src/nextjs/utils.ts
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
"use client";
;
;
// package.json
var name = "@vercel/speed-insights";
var version = "1.1.0";
// src/queue.ts
var initQueue = ()=>{
    if (window.si) return;
    window.si = function a(...params) {
        (window.siq = window.siq || []).push(params);
    };
};
// src/utils.ts
function isBrowser() {
    return typeof window !== "undefined";
}
function detectEnvironment() {
    try {
        const env = ("TURBOPACK compile-time value", "development");
        if ("TURBOPACK compile-time truthy", 1) {
            return "development";
        }
    } catch (e) {}
    return "production";
}
function isDevelopment() {
    return detectEnvironment() === "development";
}
function computeRoute(pathname, pathParams) {
    if (!pathname || !pathParams) {
        return pathname;
    }
    let result = pathname;
    try {
        const entries = Object.entries(pathParams);
        for (const [key, value] of entries){
            if (!Array.isArray(value)) {
                const matcher = turnValueToRegExp(value);
                if (matcher.test(result)) {
                    result = result.replace(matcher, `/[${key}]`);
                }
            }
        }
        for (const [key, value] of entries){
            if (Array.isArray(value)) {
                const matcher = turnValueToRegExp(value.join("/"));
                if (matcher.test(result)) {
                    result = result.replace(matcher, `/[...${key}]`);
                }
            }
        }
        return result;
    } catch (e) {
        return pathname;
    }
}
function turnValueToRegExp(value) {
    return new RegExp(`/${escapeRegExp(value)}(?=[/?#]|$)`);
}
function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
// src/generic.ts
var SCRIPT_URL = "https://va.vercel-scripts.com/v1/speed-insights";
var PROD_SCRIPT_URL = `${SCRIPT_URL}/script.js`;
var DEV_SCRIPT_URL = `${SCRIPT_URL}/script.debug.js`;
var PROXY_SCRIPT_URL = "/_vercel/speed-insights/script.js";
function injectSpeedInsights(props = {}) {
    var _a;
    if (!isBrowser() || props.route === null) return null;
    initQueue();
    const isSelfHosted = Boolean(props.dsn);
    const productionScript = isSelfHosted ? PROD_SCRIPT_URL : PROXY_SCRIPT_URL;
    const src = props.scriptSrc || (isDevelopment() ? DEV_SCRIPT_URL : productionScript);
    if (document.head.querySelector(`script[src*="${src}"]`)) return null;
    if (props.beforeSend) {
        (_a = window.si) == null ? void 0 : _a.call(window, "beforeSend", props.beforeSend);
    }
    const script = document.createElement("script");
    script.src = src;
    script.defer = true;
    script.dataset.sdkn = name + (props.framework ? `/${props.framework}` : "");
    script.dataset.sdkv = version;
    if (props.sampleRate) {
        script.dataset.sampleRate = props.sampleRate.toString();
    }
    if (props.route) {
        script.dataset.route = props.route;
    }
    if (props.endpoint) {
        script.dataset.endpoint = props.endpoint;
    }
    if (props.dsn) {
        script.dataset.dsn = props.dsn;
    }
    if (isDevelopment() && props.debug === false) {
        script.dataset.debug = "false";
    }
    script.onerror = ()=>{
        console.log(`[Vercel Speed Insights] Failed to load script from ${src}. Please check if any content blockers are enabled and try again.`);
    };
    document.head.appendChild(script);
    return {
        setRoute: (route)=>{
            script.dataset.route = route ?? void 0;
        }
    };
}
// src/react/index.tsx
function SpeedInsights(props) {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SpeedInsights.useEffect": ()=>{
            var _a;
            if (props.beforeSend) {
                (_a = window.si) == null ? void 0 : _a.call(window, "beforeSend", props.beforeSend);
            }
        }
    }["SpeedInsights.useEffect"], [
        props.beforeSend
    ]);
    const setScriptRoute = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SpeedInsights.useEffect": ()=>{
            if (!setScriptRoute.current) {
                const script = injectSpeedInsights({
                    framework: props.framework || "react",
                    ...props
                });
                if (script) {
                    setScriptRoute.current = script.setRoute;
                }
            } else if (props.route) {
                setScriptRoute.current(props.route);
            }
        }
    }["SpeedInsights.useEffect"], [
        props.route
    ]);
    return null;
}
;
var useRoute = ()=>{
    const params = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useParams"])();
    const searchParams = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"])() || new URLSearchParams();
    const path = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    if (!params) {
        return null;
    }
    const finalParams = Object.keys(params).length ? params : Object.fromEntries(searchParams.entries());
    return computeRoute(path, finalParams);
};
// src/nextjs/index.tsx
function SpeedInsightsComponent(props) {
    const route = useRoute();
    return /* @__PURE__ */ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].createElement(SpeedInsights, {
        route,
        ...props,
        framework: "next"
    });
}
function SpeedInsights2(props) {
    return /* @__PURE__ */ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].createElement(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Suspense"], {
        fallback: null
    }, /* @__PURE__ */ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].createElement(SpeedInsightsComponent, {
        ...props
    }));
}
;
 //# sourceMappingURL=index.mjs.map
}}),
}]);

//# sourceMappingURL=_0b6d4a._.js.map