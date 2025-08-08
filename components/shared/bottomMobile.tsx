"use client";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"

import React from "react";
import { useMediaQuery } from "react-responsive";
import Container from "./container";
import { Button } from "../ui";
import { User } from "lucide-react";
import ButtonAuth from "./button-auth";

interface Props {
    className?: string;
}

export const BottomMobile: React.FC<Props> = ({ className }) => {

    return (
        <Drawer>
            <DrawerTrigger>
                <Button variant="outline" size="icon" className="">
                    <User />
                </Button>
            </DrawerTrigger>
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle>Авторизация</DrawerTitle>
                    <DrawerDescription>Выберите удобный способ авторизации.</DrawerDescription>
                </DrawerHeader>
                <DrawerFooter>
                    <ButtonAuth />
                    <DrawerClose>
                        <Button variant="outline">Отмена</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
};

export default BottomMobile;
