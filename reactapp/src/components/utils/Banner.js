export default function Banner({ children, style, src }) {
  return (
    <>
      <img
        class="w-full rounded-xl object-cover object-center aspect-video"
        src={src}
        alt="product"
      />
    </>
  );
}
