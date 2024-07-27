"use client"

import { Container, Group, Anchor } from '@mantine/core';
import { MantineLogo } from '@mantinex/mantine-logo';

const links = [
  { link: '#', label: 'Contact' },
  { link: '#', label: 'Privacy' },
  { link: '#', label: 'Blog' },
  { link: '#', label: 'Careers' },
];

export function Footer() {
  const items = links.map((link) => (
    <Anchor<'a'>
      c="dimmed"
      key={link.label}
      href={link.link}
      onClick={(event) => event.preventDefault()}
      size="sm"
    >
      {link.label}
    </Anchor>
  ));

  return (
    <div className="tw-mt-[30rem] tw-border-t tw-border-gray-200">
      <Container className="tw-flex tw-flex-col sm:tw-flex-row tw-justify-between tw-items-center tw-pt-[var(--mantine-spacing-xl)] tw-pb-[var(--mantine-spacing-xl)]">
        <MantineLogo size={28} />
        <Group className="tw-flex tw-flex-col tw-mt-3 sm:tw-mt-0">
          {items}
        </Group>
      </Container>
    </div>
  );
}
