"use client";
import {
  Navbar as HeroUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
  Button,
  Kbd,
  Link,
  Input,
  link as linkStyles,
} from "@heroui/react";
import NextLink from "next/link";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import { SearchIcon, Logo } from "@/components/icons";

const SearchInput = (props: any) => {
  const [mounted, setMounted] = useState(false);

  const router = useRouter();
  const [value, setValue] = useState("");

  useEffect(() => setMounted(true), []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (value.trim()) {
        router.push(`/search?q=${encodeURIComponent(value)}`);
      }
    }
  };

  const handleValueChange = (val: string) => {
    setValue(val);
    props.onValueChange?.(val);
  };

  if (!mounted)
    return <div className="w-full h-10 bg-default-100 rounded-xl" />;

  return (
    <Input
      {...props}
      suppressHydrationWarning
      value={value}
      onKeyDown={handleKeyDown}
      onValueChange={handleValueChange}
    />
  );
};

export const Navbar = () => {
  return (
    <HeroUINavbar className="px-0 md:px-12" maxWidth="2xl" position="sticky">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <div className="flex items-center gap-2 ml-1">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-success-300 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">
                  <Logo />
                </span>
              </div>
              <h1 className="text-xl font-bold text-foreground">LISTOFONT</h1>
            </div>
            {/* <Logo />
            <p className="font-bold text-inherit">LISTOFONT</p> */}
          </NextLink>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden sm:flex gap-2">
          <ul className="hidden lg:flex gap-4 justify-start mx-4 text-xs">
            {siteConfig.navItems.map((item) => (
              <NavbarItem key={item.href}>
                <NextLink
                  className={clsx(
                    "text-sm",
                    linkStyles({ color: "foreground" }),
                    "data-[active=true]:text-primary data-[active=true]:font-medium",
                  )}
                  color="foreground"
                  href={item.href}
                >
                  {item.label}
                </NextLink>
              </NavbarItem>
            ))}
          </ul>
          {/* <Link isExternal aria-label="Github" href={siteConfig.links.formine}>
            <BsFillLayersFill className="text-default-500" size={21} />
          </Link> */}
          <ThemeSwitch />
        </NavbarItem>
        <NavbarItem className="hidden lg:flex">
          <SearchInput
            aria-label="Search"
            classNames={{
              inputWrapper: "bg-default-100",
              input: "text-sm",
            }}
            endContent={
              <Kbd className="hidden lg:inline-block" keys={["command"]}>
                K
              </Kbd>
            }
            id="search-desktop"
            labelPlacement="outside"
            placeholder="Search..."
            startContent={
              <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
            }
            type="search"
            onFocus={(e: React.FocusEvent<HTMLInputElement>) => {
              e.target.style.outline = "none";
            }}
          />
        </NavbarItem>
        <NavbarItem className="hidden md:flex gap-2">
          {/* <Button
            as={NextLink}
            className="bg-default-100 text-default-800"
            href={siteConfig.links.login}
            variant="flat"
          >
            Login
          </Button> */}
          <Button
            as={NextLink}
            className="text-default-800 shadow-lg"
            color="primary"
            href={siteConfig.links.join}
            variant="ghost"
          >
            Join
          </Button>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <Link isExternal aria-label="Github" href={siteConfig.links.formine}>
          {/* <BsFillLayersFill className="text-default-500" size={21} /> */}
        </Link>
        <ThemeSwitch />
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu>
        <SearchInput
          aria-label="Search"
          classNames={{
            inputWrapper: "bg-default-100",
            input: "text-sm",
          }}
          endContent={
            <Kbd className="hidden lg:inline-block" keys={["command"]}>
              K
            </Kbd>
          }
          id="search-mobile"
          labelPlacement="outside"
          placeholder="Search..."
          startContent={
            <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
          }
          type="search"
          onFocus={(e: React.FocusEvent<HTMLInputElement>) => {
            e.target.style.outline = "none";
          }}
        />
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {siteConfig.navMenuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                color="foreground"
                // color={
                //   index === 2
                //     ? "primary"
                //     : index === siteConfig.navMenuItems.length - 1
                //       ? "danger"
                //       : "foreground"
                // }
                href={item.href}
                size="md"
              >
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
        </div>
        <div className="mt-4 flex flex-col gap-2">
          {/* <Button
            as={NextLink}
            className="w-full bg-default-100 text-default-800"
            href={siteConfig.links.login}
            variant="flat"
          >
            Login
          </Button> */}
          <Button
            as={NextLink}
            className="w-full text-default-800 shadow-lg"
            color="primary"
            href={siteConfig.links.join}
            variant="ghost"
          >
            Join
          </Button>
        </div>
      </NavbarMenu>
    </HeroUINavbar>
  );
};
