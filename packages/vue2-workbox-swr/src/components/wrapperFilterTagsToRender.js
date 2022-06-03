export default {
  name: "itdComponentFunctional",
  functional: true,
  render(h, context) {
    if (!Object.keys(context.data).length && !Object.keys(context.props).length)
      return null;
    const { data } = context;
    console.log("itdComponentFunctional data", context);
    const { component } = data.attrs;
    delete data.attrs.component;
    // let localComponent = component;
    const result = h(component, {
      ...context.data,
      props: context.props,
    });
    console.log("componente final", context.data.component, result);
    return result;
  },
};
