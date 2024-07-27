"use client"

import { useState } from 'react';
import { Container, Group, Burger } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { MantineLogo } from '@mantinex/mantine-logo';

const links = [
  { link: '/about', label: 'Features' },
  { link: '/pricing', label: 'Pricing' },
  { link: '/learn', label: 'Learn' },
  { link: '/community', label: 'Community' },
];

export function Header() {
  const [opened, { toggle }] = useDisclosure(false);
  const [active, setActive] = useState(links[0].link);

  const items = links.map((link) => (
    <a
      key={link.label}
      href={link.link}
      className="tw-block tw-leading-none tw-px-3 tw-py-2 tw-rounded-[var(--mantine-radius-sm)] tw-no-underline tw-text-[light-dark(var(--mantine-color-gray-7), var(--mantine-color-dark-0))] tw-text-sm tw-font-medium tw-hover:bg-[light-dark(var(--mantine-color-gray-0), var(--mantine-color-dark-6))]"
      data-active={active === link.link || undefined}
      onClick={(event) => {
        event.preventDefault();
        setActive(link.link);
      }}
    >
      {link.label}
    </a>
  ));

  return (
    <header className="tw-h-14 tw-mb-5 tw-bg-[var(--mantine-color-body)] tw-border-b tw-border-[light-dark(var(--mantine-color-gray-3),var(--mantine-color-dark-4))]">
      <Container size="md" className="tw-h-14 tw-flex tw-justify-between tw-items-center">
        <MantineLogo size={28} />
        <Group gap={5} visibleFrom="xs">
          {items}
        </Group>
        <Burger opened={opened} onClick={toggle} hiddenFrom="xs" size="sm" />
      </Container>
    </header>
  );
}
