
const Footer = () => {
  return (
    <footer className="text-center py-6 mt-6 text-sm text-gray-500 border-gray-200">
      © {new Date().getFullYear()} <span className="font-semibold">E-Shop</span>
      . All rights reserved.
    </footer>
  );
};

export default Footer;
