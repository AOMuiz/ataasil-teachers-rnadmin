import Link from "next/link";
import {
  ResourceDefinition,
  useGetResourceLabel,
  useResourceDefinitions,
} from "ra-core";
import { Logout, useLogout } from "react-admin";

export const Sidebar = () => {
  const logout = useLogout();
  const resources = useResourceDefinitions();

  return (
    <nav className="text-black bg-white px-5">
      <ul>
        {Object.keys(resources).map((resource) => (
          <SidebarItem key={resource} definition={resources[resource]} />
        ))}
      </ul>
      <button onClick={() => logout()}>Logout</button>
    </nav>
  );
};

const SidebarItem = ({ definition }: { definition: ResourceDefinition }) => {
  const getResourceLabel = useGetResourceLabel();

  return (
    <li>
      <Link href={`/${definition.name}`}>
        {getResourceLabel(definition.name, 2)}
      </Link>
    </li>
  );
};
