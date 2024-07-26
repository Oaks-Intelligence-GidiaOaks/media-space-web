import { useLocation } from 'react-router-dom';

const useBreadcrumbs = () => {
  const location = useLocation();
  const { pathname } = location;

  const pathnames = pathname.split('/').filter((x) => x);

  return pathnames.map((value, index) => {
    const to = `/${pathnames.slice(0, index + 1).join('/')}`;

    // Format the value to be more readable
    const formattedValue = value.replace(/-/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase());

    return { to, label: formattedValue };
  });
};

export default useBreadcrumbs;
