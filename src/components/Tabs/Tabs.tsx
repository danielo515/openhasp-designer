import { Component } from "solid-js";

interface TabsProps {
  class?: string;
}

export const Tabs: Component<TabsProps> = (p) => {
  return (
    <div class={`tabs ${p.class}`}>
      {p.children}
      <a class="tab tab-lifted flex-1"></a>
    </div>
  );
};

interface TabProps {
  isActive?: boolean;
  onClick?: () => void;
}

export const Tab: Component<TabProps> = (p) => {
  return (
    <a class="tab tab-lifted" classList={{ "tab-active": p.isActive ?? false }} onClick={p.onClick}>
      {p.children}
    </a>
  );
};
