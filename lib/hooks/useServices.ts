export default function useServices() {
  function scrollToView(id: string) {
    const el = document.getElementById(id);

    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }

  return { scrollToView };
}
