import logo from "../../assets/logo.png";

export default function Logo({ children, style }) {
  return (
    <>
      <img src={logo} alt="Logo" class={style} />
      {children}
    </>
  );
}
