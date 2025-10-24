'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Display,
  H1,
  H2,
  H3,
  H4,
  Body,
  Caption,
  Lead,
  Muted,
  Blockquote,
  InlineCode,
} from '@/components/ui/typography';
import {
  Currency,
  Percentage,
  WalletAddress,
  DataLarge,
  APYBadge,
  StatCard,
} from '@/components/ui/data-display';
import {
  Spinner,
  Skeleton,
  SkeletonText,
  SkeletonCard,
  LoadingDots,
  Progress,
} from '@/components/ui/loading';
import {
  FadeIn,
  SlideIn,
  ScaleIn,
  StaggerContainer,
  StaggerItem,
  AnimatedCard,
} from '@/components/ui/motion-wrappers';
import {
  AnimatedCounter,
  CurrencyCounter,
  PercentageCounter,
  StatCounter,
} from '@/components/ui/animated-counter';
import {
  showEarningsCelebration,
  showDepositSuccess,
  showAchievementUnlocked,
} from '@/lib/toast-helpers';

export default function DesignSystemPage() {
  const [isLoading, setIsLoading] = React.useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-6 py-8">
          <Display className="mb-2">PropertyLend Design System</Display>
          <Lead>
            A comprehensive design system for the PropertyLend platform featuring colors,
            typography, components, and animations.
          </Lead>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto space-y-16 px-6 py-12">
        {/* Colors */}
        <section>
          <H2 className="mb-6">Color Palette</H2>
          <div className="space-y-8">
            {/* Brand Colors */}
            <div>
              <H3 className="mb-4">Brand Colors</H3>
              <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
                <ColorSwatch name="Navy 50" color="bg-navy-50" hex="#E8EEF5" />
                <ColorSwatch name="Navy 500" color="bg-navy-500" hex="#2E6CB9" dark />
                <ColorSwatch name="Navy 900" color="bg-navy-900" hex="#0A2540" dark />
                <ColorSwatch name="Gold 500" color="bg-gold-500" hex="#F4CE50" />
                <ColorSwatch name="Gold 600" color="bg-gold-600" hex="#D4AF37" />
              </div>
            </div>

            {/* Semantic Colors */}
            <div>
              <H3 className="mb-4">Semantic Colors</H3>
              <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                <ColorSwatch name="Success" color="bg-success-500" hex="#10B981" dark />
                <ColorSwatch name="Warning" color="bg-warning-500" hex="#F59E0B" />
                <ColorSwatch name="Danger" color="bg-danger-500" hex="#EF4444" dark />
                <ColorSwatch name="Info" color="bg-info-500" hex="#3B82F6" dark />
              </div>
            </div>
          </div>
        </section>

        {/* Typography */}
        <section>
          <H2 className="mb-6">Typography</H2>
          <div className="space-y-4">
            <div>
              <Display>Display Heading</Display>
              <Caption>72px, Bold, DM Serif Display</Caption>
            </div>
            <div>
              <H1>Heading 1</H1>
              <Caption>48px, Bold, Inter</Caption>
            </div>
            <div>
              <H2>Heading 2</H2>
              <Caption>36px, Semibold, Inter</Caption>
            </div>
            <div>
              <H3>Heading 3</H3>
              <Caption>30px, Semibold, Inter</Caption>
            </div>
            <div>
              <H4>Heading 4</H4>
              <Caption>24px, Semibold, Inter</Caption>
            </div>
            <div>
              <Body size="lg">Large body text for introductory paragraphs and emphasis.</Body>
              <Caption>18px, Regular, Inter</Caption>
            </div>
            <div>
              <Body>
                Regular body text for main content. This is the default size for most paragraph text
                throughout the application.
              </Body>
              <Caption>16px, Regular, Inter</Caption>
            </div>
            <div>
              <Body size="sm">Small body text for secondary information and captions.</Body>
              <Caption>14px, Regular, Inter</Caption>
            </div>
            <div>
              <Caption>Caption text for labels and metadata</Caption>
              <Caption>12px, Medium, Inter</Caption>
            </div>
          </div>
        </section>

        {/* Buttons */}
        <section>
          <H2 className="mb-6">Buttons</H2>
          <div className="space-y-6">
            <div>
              <H3 className="mb-4">Variants</H3>
              <div className="flex flex-wrap gap-3">
                <Button variant="default">Default</Button>
                <Button variant="gold">Gold</Button>
                <Button variant="navy">Navy</Button>
                <Button variant="success">Success</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="destructive">Destructive</Button>
              </div>
            </div>
            <div>
              <H3 className="mb-4">Sizes</H3>
              <div className="flex flex-wrap items-center gap-3">
                <Button size="sm">Small</Button>
                <Button size="default">Default</Button>
                <Button size="lg">Large</Button>
                <Button size="xl">Extra Large</Button>
              </div>
            </div>
            <div>
              <H3 className="mb-4">States</H3>
              <div className="flex flex-wrap gap-3">
                <Button>Normal</Button>
                <Button isLoading>Loading</Button>
                <Button disabled>Disabled</Button>
              </div>
            </div>
          </div>
        </section>

        {/* Cards */}
        <section>
          <H2 className="mb-6">Cards</H2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card variant="default">
              <CardHeader>
                <CardTitle>Default Card</CardTitle>
                <CardDescription>Standard card with shadow</CardDescription>
              </CardHeader>
              <CardContent>
                <Body size="sm">Content goes here.</Body>
              </CardContent>
            </Card>

            <Card variant="elevated">
              <CardHeader>
                <CardTitle>Elevated Card</CardTitle>
                <CardDescription>Larger shadow with hover effect</CardDescription>
              </CardHeader>
              <CardContent>
                <Body size="sm">Hover to see effect.</Body>
              </CardContent>
            </Card>

            <Card variant="interactive">
              <CardHeader>
                <CardTitle>Interactive Card</CardTitle>
                <CardDescription>Clickable with lift effect</CardDescription>
              </CardHeader>
              <CardContent>
                <Body size="sm">Click to interact.</Body>
              </CardContent>
            </Card>

            <Card variant="senior">
              <CardHeader>
                <CardTitle>Senior Tranche</CardTitle>
                <CardDescription>Navy gradient background</CardDescription>
              </CardHeader>
              <CardContent>
                <APYBadge value={8.5} variant="senior" />
              </CardContent>
            </Card>

            <Card variant="junior">
              <CardHeader>
                <CardTitle>Junior Tranche</CardTitle>
                <CardDescription>Purple gradient background</CardDescription>
              </CardHeader>
              <CardContent>
                <APYBadge value={25.0} variant="junior" />
              </CardContent>
            </Card>

            <Card variant="gold">
              <CardHeader>
                <CardTitle>Gold Card</CardTitle>
                <CardDescription>Premium gold gradient</CardDescription>
              </CardHeader>
              <CardContent>
                <Badge variant="achievement">Premium</Badge>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Badges */}
        <section>
          <H2 className="mb-6">Badges</H2>
          <div className="space-y-6">
            <div>
              <H3 className="mb-4">Variants</H3>
              <div className="flex flex-wrap gap-2">
                <Badge variant="default">Default</Badge>
                <Badge variant="secondary">Secondary</Badge>
                <Badge variant="outline">Outline</Badge>
                <Badge variant="success">Success</Badge>
                <Badge variant="warning">Warning</Badge>
                <Badge variant="danger">Danger</Badge>
                <Badge variant="info">Info</Badge>
                <Badge variant="gold">Gold</Badge>
                <Badge variant="navy">Navy</Badge>
                <Badge variant="achievement">Achievement</Badge>
              </div>
            </div>
            <div>
              <H3 className="mb-4">With Pulse</H3>
              <div className="flex flex-wrap gap-2">
                <Badge variant="status" pulse pulseColor="success">
                  Active
                </Badge>
                <Badge variant="status" pulse pulseColor="warning">
                  Pending
                </Badge>
                <Badge variant="status" pulse pulseColor="danger">
                  Error
                </Badge>
                <Badge variant="status" pulse pulseColor="gold">
                  Premium
                </Badge>
              </div>
            </div>
            <div>
              <H3 className="mb-4">Sizes</H3>
              <div className="flex flex-wrap items-center gap-2">
                <Badge size="sm">Small</Badge>
                <Badge size="md">Medium</Badge>
                <Badge size="lg">Large</Badge>
              </div>
            </div>
          </div>
        </section>

        {/* Data Display */}
        <section>
          <H2 className="mb-6">Data Display</H2>
          <div className="space-y-8">
            <div>
              <H3 className="mb-4">Currency</H3>
              <div className="flex flex-wrap items-baseline gap-6">
                <Currency value={1234567.89} size="sm" />
                <Currency value={1234567.89} size="default" />
                <Currency value={1234567.89} size="lg" color="gold" />
                <Currency value={1234567.89} size="2xl" color="navy" />
                <Currency value={1234567.89} compact size="xl" color="positive" />
              </div>
            </div>

            <div>
              <H3 className="mb-4">Percentage</H3>
              <div className="flex flex-wrap items-baseline gap-6">
                <Percentage value={8.5} />
                <Percentage value={25.3} color="positive" showSign />
                <Percentage value={-5.2} color="negative" showSign />
                <Percentage value={15.75} size="xl" color="positive" />
              </div>
            </div>

            <div>
              <H3 className="mb-4">Wallet Address</H3>
              <div className="space-y-2">
                <WalletAddress address="0x1234567890abcdef1234567890abcdef12345678" />
                <WalletAddress
                  address="0x1234567890abcdef1234567890abcdef12345678"
                  showFull
                />
                <WalletAddress
                  address="0x1234567890abcdef1234567890abcdef12345678"
                  copyable={false}
                />
              </div>
            </div>

            <div>
              <H3 className="mb-4">Large Data</H3>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                <DataLarge
                  value="$1.2M"
                  label="Total Value Locked"
                  caption="Platform TVL"
                  color="navy"
                />
                <DataLarge value="8.5%" label="Senior APY" caption="Fixed Returns" color="gold" />
                <DataLarge
                  value="25.3%"
                  label="Junior APY"
                  caption="Variable Returns"
                  color="gradient"
                />
              </div>
            </div>

            <div>
              <H3 className="mb-4">Stat Cards</H3>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                <StatCard label="Total Earnings" value="$12,345.67" change={15.3} />
                <StatCard label="Active Loans" value="42" change={-2.1} />
                <StatCard label="Default Rate" value="0.5%" />
              </div>
            </div>
          </div>
        </section>

        {/* Loading States */}
        <section>
          <H2 className="mb-6">Loading States</H2>
          <div className="space-y-8">
            <div>
              <H3 className="mb-4">Spinners</H3>
              <div className="flex flex-wrap items-center gap-6">
                <Spinner size="sm" />
                <Spinner size="default" />
                <Spinner size="lg" />
                <Spinner size="xl" variant="gold" />
              </div>
            </div>

            <div>
              <H3 className="mb-4">Loading Dots</H3>
              <div className="flex items-center gap-4">
                <LoadingDots className="text-navy-600" />
                <LoadingDots className="text-gold-600" />
              </div>
            </div>

            <div>
              <H3 className="mb-4">Progress</H3>
              <div className="space-y-4">
                <Progress value={33} variant="default" />
                <Progress value={66} variant="gold" />
                <Progress value={90} variant="success" showLabel />
              </div>
            </div>

            <div>
              <H3 className="mb-4">Skeletons</H3>
              <div className="space-y-4">
                <Skeleton className="h-8 w-64" />
                <SkeletonText lines={3} />
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <SkeletonCard />
                  <SkeletonCard />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Animations */}
        <section>
          <H2 className="mb-6">Animations</H2>
          <div className="space-y-8">
            <div>
              <H3 className="mb-4">Fade In</H3>
              <FadeIn>
                <Card>
                  <CardContent className="py-8">
                    <Body>This card fades in when scrolled into view.</Body>
                  </CardContent>
                </Card>
              </FadeIn>
            </div>

            <div>
              <H3 className="mb-4">Slide In</H3>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <SlideIn direction="left">
                  <Card>
                    <CardContent className="py-6">
                      <Body size="sm">Slides from left</Body>
                    </CardContent>
                  </Card>
                </SlideIn>
                <SlideIn direction="right">
                  <Card>
                    <CardContent className="py-6">
                      <Body size="sm">Slides from right</Body>
                    </CardContent>
                  </Card>
                </SlideIn>
              </div>
            </div>

            <div>
              <H3 className="mb-4">Stagger Container</H3>
              <StaggerContainer>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  <StaggerItem>
                    <Card variant="interactive">
                      <CardContent className="py-6">
                        <Body size="sm">Item 1</Body>
                      </CardContent>
                    </Card>
                  </StaggerItem>
                  <StaggerItem>
                    <Card variant="interactive">
                      <CardContent className="py-6">
                        <Body size="sm">Item 2</Body>
                      </CardContent>
                    </Card>
                  </StaggerItem>
                  <StaggerItem>
                    <Card variant="interactive">
                      <CardContent className="py-6">
                        <Body size="sm">Item 3</Body>
                      </CardContent>
                    </Card>
                  </StaggerItem>
                </div>
              </StaggerContainer>
            </div>

            <div>
              <H3 className="mb-4">Animated Cards</H3>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                <AnimatedCard hoverLift glow="navy">
                  <Card>
                    <CardContent className="py-8 text-center">
                      <Body>Hover for navy glow</Body>
                    </CardContent>
                  </Card>
                </AnimatedCard>
                <AnimatedCard hoverLift glow="gold">
                  <Card>
                    <CardContent className="py-8 text-center">
                      <Body>Hover for gold glow</Body>
                    </CardContent>
                  </Card>
                </AnimatedCard>
                <AnimatedCard hoverLift glow="none">
                  <Card>
                    <CardContent className="py-8 text-center">
                      <Body>Hover for lift</Body>
                    </CardContent>
                  </Card>
                </AnimatedCard>
              </div>
            </div>
          </div>
        </section>

        {/* Counters */}
        <section>
          <H2 className="mb-6">Animated Counters</H2>
          <div className="space-y-8">
            <div>
              <H3 className="mb-4">Currency Counter</H3>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                <div>
                  <Caption>Compact</Caption>
                  <CurrencyCounter value={1234567} compact className="text-4xl" />
                </div>
                <div>
                  <Caption>Full</Caption>
                  <CurrencyCounter value={1234567.89} className="text-4xl" />
                </div>
                <div>
                  <Caption>Large</Caption>
                  <CurrencyCounter
                    value={5432100}
                    compact
                    className="text-5xl text-gold-600"
                  />
                </div>
              </div>
            </div>

            <div>
              <H3 className="mb-4">Percentage Counter</H3>
              <div className="flex flex-wrap gap-8">
                <PercentageCounter value={8.5} className="text-3xl" />
                <PercentageCounter value={25.3} showSign className="text-3xl text-success-600" />
                <PercentageCounter
                  value={-5.2}
                  showSign
                  className="text-3xl text-danger-600"
                />
              </div>
            </div>

            <div>
              <H3 className="mb-4">Stat Counters</H3>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                <StatCounter
                  label="Total Value Locked"
                  value={1234567}
                  format="currency"
                  size="lg"
                />
                <StatCounter label="Active Investors" value={892} format="number" size="lg" />
                <StatCounter
                  label="Average APY"
                  value={15.7}
                  format="percentage"
                  size="lg"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Toast Notifications */}
        <section>
          <H2 className="mb-6">Toast Notifications</H2>
          <div className="space-y-4">
            <div className="flex flex-wrap gap-3">
              <Button onClick={() => showEarningsCelebration(1234.56)}>
                Show Earnings Toast
              </Button>
              <Button onClick={() => showDepositSuccess(10000, 'senior')}>
                Show Deposit Toast
              </Button>
              <Button onClick={() => showAchievementUnlocked('First Deposit', 'You deposited $100+')}>
                Show Achievement
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

/**
 * Color Swatch Component
 */
function ColorSwatch({
  name,
  color,
  hex,
  dark = false,
}: {
  name: string;
  color: string;
  hex: string;
  dark?: boolean;
}) {
  return (
    <div className="space-y-2">
      <div className={`h-20 w-full rounded-lg ${color}`} />
      <div className="space-y-0.5">
        <Body size="sm" weight="medium">
          {name}
        </Body>
        <Caption className="font-mono">{hex}</Caption>
      </div>
    </div>
  );
}
