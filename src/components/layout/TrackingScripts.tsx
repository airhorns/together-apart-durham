import React from "react";

export const TrackingScripts =
  process.env.NODE_ENV == "production" ? (
    <React.Fragment>
      <script async src="https://www.googletagmanager.com/gtag/js?id=UA-161950128-1"></script>
      <script
        type="text/javascript"
        dangerouslySetInnerHTML={{
          __html: `
  window.dataLayer = window.dataLayer || [];
  function gtag() {
    dataLayer.push(arguments);
  }
  gtag("js", new Date());
  gtag("config", "UA-161950128-1", { anonymize_ip: false });
`,
        }}
      />
      <script
        type="text/javascript"
        dangerouslySetInnerHTML={{
          __html: `
  !(function (f, b, e, v, n, t, s) {
    if (f.fbq) return;
    n = f.fbq = function () {
      n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
    };
    if (!f._fbq) f._fbq = n;
    n.push = n;
    n.loaded = !0;
    n.version = "2.0";
    n.agent = "plwebflow";
    n.queue = [];
    t = b.createElement(e);
    t.async = !0;
    t.src = v;
    s = b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t, s);
  })(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");
  fbq("init", "268176577514147");
  fbq("track", "PageView");`,
        }}
      />
      <script
        type="text/javascript"
        dangerouslySetInnerHTML={{
          __html: `
      (window.heap = window.heap || []),
        (heap.load = function (e, t) {
          (window.heap.appid = e), (window.heap.config = t = t || {});
          var r = document.createElement("script");
          (r.type = "text/javascript"), (r.async = !0), (r.src = "https://cdn.heapanalytics.com/js/heap-" + e + ".js");
          var a = document.getElementsByTagName("script")[0];
          a.parentNode.insertBefore(r, a);
          for (
            var n = function (e) {
                return function () {
                  heap.push([e].concat(Array.prototype.slice.call(arguments, 0)));
                };
              },
              p = [
                "addEventProperties",
                "addUserProperties",
                "clearEventProperties",
                "identify",
                "resetIdentity",
                "removeEventProperty",
                "setEventProperties",
                "track",
                "unsetEventProperty",
              ],
              o = 0;
            o < p.length;
            o++
          )
            heap[p[o]] = n(p[o]);
        });
      if (window.location.host.indexOf("together-apart.ca") != -1) {
        heap.load("415434005");
      } else {
        heap.load("3041848733");
      }
      `,
        }}
      />
    </React.Fragment>
  ) : (
    <React.Fragment />
  );
