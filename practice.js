function Component() {
  const [state, setState] = useState();

  function handleClick() {
    setState((prev) => prev + 1);
  }
  //...
}
