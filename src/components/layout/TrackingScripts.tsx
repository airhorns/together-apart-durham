import React from "react";
import { CurrentSite, CurrentSiteName } from "../../lib/sites";

export const TrackingScripts =
  process.env.NODE_ENV == "production" ? (
    <React.Fragment>
      <script async src={`https://www.googletagmanager.com/gtag/js?id=${CurrentSite.googleAnalyticsID}`}></script>
      <script
        type="text/javascript"
        dangerouslySetInnerHTML={{
          __html: `
  window.dataLayer = window.dataLayer || [];
  function gtag() {
    dataLayer.push(arguments);
  }
  gtag("js", new Date());
  gtag("config", "${CurrentSite.googleAnalyticsID}", { anonymize_ip: false });
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
      {CurrentSiteName == "ottawa" && (
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `
window['_fs_debug'] = false;
window['_fs_host'] = 'fullstory.com';
window['_fs_script'] = 'edge.fullstory.com/s/fs.js';
window['_fs_org'] = 'V3907';
window['_fs_namespace'] = 'FS';
(function(m,n,e,t,l,o,g,y){
    if (e in m) {if(m.console && m.console.log) { m.console.log('FullStory namespace conflict. Please set window["_fs_namespace"].');} return;}
    g=m[e]=function(a,b,s){g.q?g.q.push([a,b,s]):g._api(a,b,s);};g.q=[];
    o=n.createElement(t);o.async=1;o.crossOrigin='anonymous';o.src='https://'+_fs_script;
    y=n.getElementsByTagName(t)[0];y.parentNode.insertBefore(o,y);
    g.identify=function(i,v,s){g(l,{uid:i},s);if(v)g(l,v,s)};g.setUserVars=function(v,s){g(l,v,s)};g.event=function(i,v,s){g('event',{n:i,p:v},s)};
    g.anonymize=function(){g.identify(!!0)};
    g.shutdown=function(){g("rec",!1)};g.restart=function(){g("rec",!0)};
    g.log = function(a,b){g("log",[a,b])};
    g.consent=function(a){g("consent",!arguments.length||a)};
    g.identifyAccount=function(i,v){o='account';v=v||{};v.acctId=i;g(o,v)};
    g.clearUserCookie=function(){};
    g._w={};y='XMLHttpRequest';g._w[y]=m[y];y='fetch';g._w[y]=m[y];
    if(m[y])m[y]=function(){return g._w[y].apply(this,arguments)};
    g._v="1.2.0";
})(window,document,window['_fs_namespace'],'script','user');
`,
          }}
        />
      )}
    </React.Fragment>
  ) : (
    <React.Fragment />
  );
