import React from 'react';
import { NavLink } from 'react-router-dom';

interface NavigationItem {
  label: string;
  path: string;
  external?: boolean;
}

interface Props {
  items: NavigationItem[];
}

function NavigationList({ items }: Props) {
  return (
    <nav>
      {items.map(({ path, label, external = false }) => {
        if (external) {
          return (
            <a
              key={path}
              href={path}
              rel="noopener noreferrer"
              target="_blank"
              className="link-white"
            >
              {label}
            </a>
          );
        }
        return (
          <NavLink
            key={path}
            to={path}
            className="flex py-1 link-white flex-0"
            activeClassName="border-accent text-opacity-100"
          >
            <div className="flex-shrink-0 truncate">{label}</div>
          </NavLink>
        );
      })}
    </nav>
  );
}

export default NavigationList;
