require("now-env");
const compose = require("recompose/compose").default;
const withOffline = require("next-offline");
const withMDX = require("@zeit/next-mdx")({
  options: {
    mdPlugins: [require("remark-abbr"), require("remark-emoji")]
  }
});
const BabiliPlugin = require("babili-webpack-plugin");
const { EnvironmentPlugin } = require("webpack");

const { NODE_ENV } = process.env;
const { alias } = require("./now.json");

const withBabili = (nextConfig = {}) => {
  return Object.assign({}, nextConfig, {
    webpack(config, options) {
      if (!options.defaultLoaders) {
        throw new Error(
          "This plugin is not compatible with Next.js versions below 5.0.0 https://err.sh/next-plugins/upgrade"
        );
      }

      config.plugins = config.plugins.filter(plugin => {
        return plugin.constructor.name !== "UglifyJsPlugin";
      });

      if (!options.dev) {
        config.plugins.push(new BabiliPlugin());
      }

      return config;
    }
  });
};

const withEnv = (...envKeys) => (nextConfig = {}) => {
  return Object.assign({}, nextConfig, {
    webpack(config) {
      config.plugins.push(new EnvironmentPlugin(envKeys));
      return config;
    }
  });
};

const config = {
  assetPrefix:
    NODE_ENV === "production" ? `https://${alias}` : "http://localhost:3001"
};

if (NODE_ENV === "production") {
  Object.assign(config, {
    exportPathMap() {
      return {
        "/": { page: "/" },
        "/about": { page: "/about" },
        "/subscribe": { page: "/subscribe" },
        "/contact": { page: "/contact" },
        "/services": { page: "/services" },
        "/links": { page: "/links" },
        "/books": { page: "/books" },
        "/uses": { page: "/uses" },
        "/essays": { page: "/essays" },
        "/essays/introduccion-a-mdx": { page: "/essays/introduccion-a-mdx" },
        "/essays/documentation": { page: "/essays/documentation" },
        "/essays/an-accessible-approach-to-frontend-testing": {
          page: "/essays/an-accessible-approach-to-frontend-testing"
        },
        "/essays/how-to-keep-updated-with-the-javascript-ecosystem": {
          page: "/essays/how-to-keep-updated-with-the-javascript-ecosystem"
        },
        "/essays/bye-platzi-hi-zeit": { page: "/essays/bye-platzi-hi-zeit" },
        "/essays/sobre-el-ecosistema-y-la-fatiga-de-javascript": {
          page: "/essays/sobre-el-ecosistema-y-la-fatiga-de-javascript"
        },
        "/essays/markdown-react": { page: "/essays/markdown-react" },
        "/essays/definiendo-conceptos-closures-y-scope": {
          page: "/essays/definiendo-conceptos-closures-y-scope"
        },
        "/essays/combinando-react-y-redux": {
          page: "/essays/combinando-react-y-redux"
        },
        "/essays/introduccion-a-redux": {
          page: "/essays/introduccion-a-redux"
        },
        "/essays/como-mantenerse-actualizado-con-el-ecosistema-de-javascript": {
          page:
            "/essays/como-mantenerse-actualizado-con-el-ecosistema-de-javascript"
        },
        "/essays/documentacion": { page: "/essays/documentacion" },
        "/essays/introduccion-a-graphql": {
          page: "/essays/introduccion-a-graphql"
        },
        "/essays/ciclo-de-vida-de-un-componente-de-reactjs": {
          page: "/essays/ciclo-de-vida-de-un-componente-de-reactjs"
        },
        "/essays/que-son-y-como-funcionan-las-promesas-en-javascript": {
          page: "/essays/que-son-y-como-funcionan-las-promesas-en-javascript"
        },
        "/essays/mezclando-flujos-sincronos-y-asincronos": {
          page: "/essays/mezclando-flujos-sincronos-y-asincronos"
        },
        "/essays/implementando-un-servidor-de-graphql": {
          page: "/essays/implementando-un-servidor-de-graphql"
        }
      };
    }
  });
}

module.exports = compose(
  withMDX,
  withOffline,
  withBabili,
  withEnv("NODE_ENV")
)(config);
