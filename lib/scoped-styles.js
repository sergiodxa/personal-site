function resolveScopedStyles(scope) {
  return {
    className: scope.props.className,
    styles: scope.props.children
  }
}

export default resolveScopedStyles;
