"use client"
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import Compartilhar from "@/pages/compartilhar/view";
import Configuracoes from "@/pages/configuracoes/view";
import Enquetes from "@/pages/enquetes/view";
import Home from "@/pages/home/home";
import MeusProdutos from "@/pages/meus-produtos/view";
import { useState } from 'react';


const MenuNavegacao = () => {
    const [activeTab, setActiveTab] = useState('home');

    const handleTabChange = (tab: string) => {
        setActiveTab(tab);
    };
    return (
        <div>
            <NavigationMenu>
                <NavigationMenuList>
                    {/* Home Tab */}
                    <NavigationMenuItem >
                        <NavigationMenuTrigger onClick={() => handleTabChange('home')}>
                            Home
                        </NavigationMenuTrigger>
                    </NavigationMenuItem>

                    {/* Enquetes Tab */}
                    <NavigationMenuItem >
                        <NavigationMenuTrigger onClick={() => handleTabChange('enquetes')}>
                            Enquetes
                        </NavigationMenuTrigger>
                    </NavigationMenuItem>

                    {/* Meus Produtos Tab */}
                    <NavigationMenuItem >
                        <NavigationMenuTrigger onClick={() => handleTabChange('meus-produtos')}>
                            Meus Produtos
                        </NavigationMenuTrigger>
                    </NavigationMenuItem>

                    {/* Compartilhar Tab */}
                    <NavigationMenuItem >
                        <NavigationMenuTrigger onClick={() => handleTabChange('compartilhar')}>
                            Compartilhar
                        </NavigationMenuTrigger>
                    </NavigationMenuItem>

                    {/* Configurações Tab */}
                    <NavigationMenuItem >
                        <NavigationMenuTrigger onClick={() => handleTabChange('configuracoes')}>
                            Configurações
                        </NavigationMenuTrigger>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
            <div>
                {activeTab === 'home' && <Home />}
                {activeTab === 'enquetes' && <Enquetes />}
                {activeTab === 'meus-produtos' && <MeusProdutos />}
                {activeTab === 'compartilhar' && <Compartilhar />}
                {activeTab === 'configuracoes' && <Configuracoes />}
            </div>
        </div>
    )
}

export default MenuNavegacao;