"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("app/avaliadores/page",{

/***/ "(app-pages-browser)/./src/services/api.ts":
/*!*****************************!*\
  !*** ./src/services/api.ts ***!
  \*****************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   login: function() { return /* binding */ login; }\n/* harmony export */ });\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ \"(app-pages-browser)/./node_modules/axios/lib/axios.js\");\n\nconst baseURL = \"http://localhost:3001/api\";\nconst instance = axios__WEBPACK_IMPORTED_MODULE_0__[\"default\"].create({\n    baseURL\n});\napi.interceptors.request.use((config)=>{\n    const token = localStorage.getItem(\"token\");\n    if (token) {\n        config.headers.Authorization = \"Bearer \".concat(token);\n    }\n    return config;\n});\nconst login = async (login, senha)=>{\n    const response = await api.post(\"/api/login\", {\n        login,\n        senha\n    });\n    const token = response.data.token;\n    localStorage.setItem(\"token\", token); // Armazena o token JWT no localStorage\n    return token;\n};\n/* harmony default export */ __webpack_exports__[\"default\"] = (instance);\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL3NyYy9zZXJ2aWNlcy9hcGkudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBMEI7QUFFMUIsTUFBTUMsVUFBVUMsMkJBQStCO0FBRS9DLE1BQU1HLFdBQVdMLDZDQUFLQSxDQUFDTSxNQUFNLENBQUM7SUFDNUJMO0FBQ0Y7QUFDQU0sSUFBSUMsWUFBWSxDQUFDQyxPQUFPLENBQUNDLEdBQUcsQ0FBQyxDQUFDQztJQUM1QixNQUFNQyxRQUFRQyxhQUFhQyxPQUFPLENBQUM7SUFDbkMsSUFBSUYsT0FBTztRQUNURCxPQUFPSSxPQUFPLENBQUNDLGFBQWEsR0FBRyxVQUFnQixPQUFOSjtJQUMzQztJQUNBLE9BQU9EO0FBQ1Q7QUFFTyxNQUFNTSxRQUFRLE9BQU9BLE9BQWVDO0lBQ3pDLE1BQU1DLFdBQVcsTUFBTVosSUFBSWEsSUFBSSxDQUFDLGNBQWM7UUFBRUg7UUFBT0M7SUFBTTtJQUM3RCxNQUFNTixRQUFRTyxTQUFTRSxJQUFJLENBQUNULEtBQUs7SUFDakNDLGFBQWFTLE9BQU8sQ0FBQyxTQUFTVixRQUFRLHVDQUF1QztJQUM3RSxPQUFPQTtBQUNULEVBQUU7QUFFRiwrREFBZVAsUUFBUUEsRUFBQyIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi9zcmMvc2VydmljZXMvYXBpLnRzPzk1NmUiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGF4aW9zIGZyb20gXCJheGlvc1wiO1xuXG5jb25zdCBiYXNlVVJMID0gcHJvY2Vzcy5lbnYuTkVYVF9QVUJMSUNfQVBJX1VSTDtcblxuY29uc3QgaW5zdGFuY2UgPSBheGlvcy5jcmVhdGUoe1xuICBiYXNlVVJMLFxufSk7XG5hcGkuaW50ZXJjZXB0b3JzLnJlcXVlc3QudXNlKChjb25maWcpID0+IHtcbiAgY29uc3QgdG9rZW4gPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndG9rZW4nKTtcbiAgaWYgKHRva2VuKSB7XG4gICAgY29uZmlnLmhlYWRlcnMuQXV0aG9yaXphdGlvbiA9IGBCZWFyZXIgJHt0b2tlbn1gO1xuICB9XG4gIHJldHVybiBjb25maWc7XG59KTtcblxuZXhwb3J0IGNvbnN0IGxvZ2luID0gYXN5bmMgKGxvZ2luOiBzdHJpbmcsIHNlbmhhOiBzdHJpbmcpOiBQcm9taXNlPHN0cmluZz4gPT4ge1xuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGFwaS5wb3N0KCcvYXBpL2xvZ2luJywgeyBsb2dpbiwgc2VuaGEgfSk7XG4gIGNvbnN0IHRva2VuID0gcmVzcG9uc2UuZGF0YS50b2tlbjtcbiAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3Rva2VuJywgdG9rZW4pOyAvLyBBcm1hemVuYSBvIHRva2VuIEpXVCBubyBsb2NhbFN0b3JhZ2VcbiAgcmV0dXJuIHRva2VuO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgaW5zdGFuY2U7XG4iXSwibmFtZXMiOlsiYXhpb3MiLCJiYXNlVVJMIiwicHJvY2VzcyIsImVudiIsIk5FWFRfUFVCTElDX0FQSV9VUkwiLCJpbnN0YW5jZSIsImNyZWF0ZSIsImFwaSIsImludGVyY2VwdG9ycyIsInJlcXVlc3QiLCJ1c2UiLCJjb25maWciLCJ0b2tlbiIsImxvY2FsU3RvcmFnZSIsImdldEl0ZW0iLCJoZWFkZXJzIiwiQXV0aG9yaXphdGlvbiIsImxvZ2luIiwic2VuaGEiLCJyZXNwb25zZSIsInBvc3QiLCJkYXRhIiwic2V0SXRlbSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(app-pages-browser)/./src/services/api.ts\n"));

/***/ })

});