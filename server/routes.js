const essay = slug => ({
  [`/essays/${slug}`]: {
    page: "/essay",
    query: { slug }
  }
});

module.exports = {
  "/": { page: "/" },
  "/about": { page: "/about" },
  "/subscribe": { page: "/subscribe" },
  "/essays": { page: "/essays" },
  ...essay("an-accessible-approach-to-frontend-testing"),
  ...essay("how-to-keep-updated-with-the-javascript-ecosystem"),
  ...essay("bye-platzi-hi-zeit"),
  ...essay("sobre-el-ecosistema-y-la-fatiga-de-javascript"),
  ...essay("documentation"),
  ...essay("markdown-react"),
  ...essay("definiendo-conceptos-closures-y-scope"),
  ...essay("combinando-react-y-redux"),
  ...essay("introduccion-a-redux"),
  ...essay("como-mantenerse-actualizado-con-el-ecosistema-de-javascript"),
  ...essay("documentation"),
  ...essay("documentacion"),
  ...essay("introduccion-a-graphql"),
};
