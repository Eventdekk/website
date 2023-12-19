import logo from "../../assets/logo.png";

export default function Logo({ children, style }) {
  return (
    <div class="flex items-center">
      <img src={logo} alt="Logo" class={style + " w-14 h-14 mr-2"} />
      {children}
    </div>
  );
}
