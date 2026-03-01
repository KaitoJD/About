export function scrollToSection(sectionId: string, closeMobileMenu?: () => void): void {
  const element = document.getElementById(sectionId);
  if (element) {
    const navHeight = 80; // Approximate navigation height
    const elementPosition = element.offsetTop - navHeight;

    window.scrollTo({
      top: elementPosition,
      behavior: 'smooth',
    });

    closeMobileMenu?.();
  }
}
