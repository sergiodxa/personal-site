function Gist() {
  return (
    <div>
      <script async src={`${this.props.src}.js`} />
    </div>
  );
}

export default Gist;
