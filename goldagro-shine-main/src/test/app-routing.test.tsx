import {
  Outlet,
  RouterProvider,
  createMemoryHistory,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import { DivisionPage } from "@/components/site/DivisionPage";
import { AGRO, JEWEL } from "@/lib/site-data";

afterEach(cleanup);

// The app's real root route renders the whole <html> document, which cannot be mounted inside the
// test container. These tests therefore mount the same page components in a small router, and
// check only that the router mounts and each page paints a heading (never page copy).
function renderAt(path: string) {
  const root = createRootRoute({
    component: Outlet,
    notFoundComponent: () => <h1>Page not found</h1>,
  });
  const agro = createRoute({
    getParentRoute: () => root,
    path: "/",
    component: () => <DivisionPage d={AGRO} />,
  });
  const jewel = createRoute({
    getParentRoute: () => root,
    path: "/jewellery",
    component: () => <DivisionPage d={JEWEL} />,
  });
  const router = createRouter({
    routeTree: root.addChildren([agro, jewel]),
    history: createMemoryHistory({ initialEntries: [path] }),
  });
  return render(<RouterProvider router={router} />);
}

describe("App routing", () => {
  it("renders the agro home page", async () => {
    renderAt("/");
    expect(await screen.findAllByRole("heading", { level: 1 })).not.toHaveLength(0);
  });

  it("renders the jewellery page", async () => {
    renderAt("/jewellery");
    expect(await screen.findAllByRole("heading", { level: 1 })).not.toHaveLength(0);
  });

  it("renders the not-found route", async () => {
    renderAt("/this-route-does-not-exist");
    expect(await screen.findByRole("heading", { level: 1 })).toBeTruthy();
  });
});
