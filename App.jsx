import React, { useState, useEffect, useRef } from "react";
import { Search, AlertCircle, Gamepad2, Heart, Trophy, ArrowUpDown, Swords, Sparkles, Compass, Skull, Car, Settings2, PersonStanding, BookOpen, Users, User, Gift, Crown, Glasses, Landmark } from "lucide-react";

const GAMES_DB = [
  { titre: "God of War Ragnarök", genre: "aventure", note: 94, prix: 49.99, mode: "Solo", annee: 2022, description: "Kratos et Atreus affrontent le Ragnarök dans une épopée nordique poignante.", plateformes: ["ps5"] },
  { titre: "Marvel's Spider-Man 2", genre: "action", note: 90, prix: 59.99, mode: "Solo", annee: 2023, description: "Peter et Miles unissent leurs forces contre Venom à New York.", plateformes: ["ps5"] },
  { titre: "Horizon Forbidden West", genre: "aventure", note: 88, prix: 39.99, mode: "Solo", annee: 2022, description: "Aloy explore un monde post-apocalyptique peuplé de machines animales.", plateformes: ["ps5", "ps4"] },
  { titre: "Baldur's Gate 3", genre: "rpg", note: 96, prix: 59.99, mode: "Solo/Multi", annee: 2023, description: "RPG tactique profond basé sur Donjons & Dragons, riche en choix narratifs.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Final Fantasy VII Rebirth", genre: "rpg", note: 92, prix: 69.99, mode: "Solo", annee: 2024, description: "Suite du remake culte, entre combat dynamique et grande aventure épique.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Persona 5 Royal", genre: "rpg", note: 95, prix: 39.99, mode: "Solo", annee: 2022, description: "Des lycéens deviennent des voleurs fantômes dans un Tokyo stylisé.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Disco Elysium", genre: "histoire", note: 91, prix: 24.99, mode: "Solo", annee: 2021, description: "Enquête policière onirique portée par une écriture exceptionnelle.", plateformes: ["ps5", "ps4", "pc", "xbox", "switch"] },
  { titre: "Detroit: Become Human", genre: "histoire", note: 78, prix: 29.99, mode: "Solo", annee: 2020, description: "Trois androïdes vivent des destins entrelacés à choix multiples.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Life is Strange: True Colors", genre: "histoire", note: 78, prix: 39.99, mode: "Solo", annee: 2021, description: "Alex ressent les émotions des autres pour percer un secret familial.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Stray", genre: "aventure", note: 83, prix: 19.99, mode: "Solo", annee: 2022, description: "Un chat erre dans une cité cybernétique peuplée de robots.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Cities: Skylines II", genre: "gestion", note: 65, prix: 49.99, mode: "Solo", annee: 2023, description: "Bâtis et gère une métropole complexe avec ses infrastructures.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Tropico 6", genre: "gestion", note: 74, prix: 39.99, mode: "Solo", annee: 2020, description: "Diriger une île caribéenne entre dictature et diplomatie.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Two Point Hospital", genre: "gestion", note: 82, prix: 34.99, mode: "Solo", annee: 2020, description: "Gère un hôpital loufoque et soigne des maladies improbables.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Frostpunk", genre: "gestion", note: 83, prix: 29.99, mode: "Solo", annee: 2021, description: "Survie glaciale où chaque décision de gestion coûte cher moralement.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Football Manager 2024", genre: "gestion", note: 78, prix: 54.99, mode: "Solo", annee: 2023, description: "Prends les commandes d'un club de football jusqu'au sommet.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Elden Ring", genre: "rpg", note: 96, prix: 59.99, mode: "Solo/Multi", annee: 2022, description: "Vaste monde ouvert impitoyable signé FromSoftware et George R.R. Martin.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Ghost of Tsushima", genre: "aventure", note: 83, prix: 49.99, mode: "Solo", annee: 2020, description: "Un samouraï défend son île contre l'invasion mongole.", plateformes: ["ps5", "ps4", "pc"] },
  { titre: "The Last of Us Part II", genre: "histoire", note: 93, prix: 49.99, mode: "Solo", annee: 2020, description: "Suite sombre et intense sur la vengeance et ses conséquences.", plateformes: ["ps5", "ps4"] },
  { titre: "It Takes Two", genre: "aventure", note: 89, prix: 39.99, mode: "Coopératif", annee: 2021, description: "Un couple miniaturisé doit coopérer pour sauver son mariage.", plateformes: ["ps5", "ps4", "pc", "xbox", "switch"] },
  { titre: "A Way Out", genre: "action", note: 78, prix: 29.99, mode: "Coopératif", annee: 2020, description: "Deux évadés de prison doivent coopérer du début à la fin.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Overcooked! All You Can Eat", genre: "gestion", note: 79, prix: 39.99, mode: "Coopératif", annee: 2020, description: "Cuisine chaotique et coopérative contre la montre.", plateformes: ["ps5", "ps4", "pc", "xbox", "switch"] },
  { titre: "EA Sports FC 24", genre: "sport", note: 79, prix: 69.99, mode: "Multijoueur", annee: 2023, description: "Simulation de football avec licences officielles et modes en ligne.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Gran Turismo 7", genre: "course", note: 87, prix: 69.99, mode: "Solo/Multi", annee: 2022, description: "Simulation de course exigeante avec un vaste garage de véhicules.", plateformes: ["ps5", "ps4"] },
  { titre: "Resident Evil 4 Remake", genre: "horreur", note: 93, prix: 59.99, mode: "Solo", annee: 2023, description: "Refonte du classique d'horreur-action à Léon Kennedy.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Alan Wake 2", genre: "horreur", note: 89, prix: 59.99, mode: "Solo", annee: 2023, description: "Thriller psychologique entre fiction et réalité troublante.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Hogwarts Legacy", genre: "rpg", note: 84, prix: 59.99, mode: "Solo", annee: 2023, description: "Vis la vie d'un sorcier à Poudlard au XIXe siècle.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Street Fighter 6", genre: "combat", note: 92, prix: 59.99, mode: "Multijoueur", annee: 2023, description: "Combats nerveux et compétitifs avec un roster varié.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Tekken 8", genre: "combat", note: 88, prix: 69.99, mode: "Multijoueur", annee: 2024, description: "Retour du tournoi familial Mishima avec un système offensif remanié.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Astro's Playroom", genre: "plateforme", note: 83, prix: 0, mode: "Solo", annee: 2020, description: "Aventure plateforme gratuite qui célèbre l'histoire PlayStation.", plateformes: ["ps5"] },
  { titre: "Ratchet & Clank: Rift Apart", genre: "plateforme", note: 88, prix: 39.99, mode: "Solo", annee: 2021, description: "Voyage entre dimensions truffé d'armes délirantes et d'humour.", plateformes: ["ps5", "pc"] },
  { titre: "Sifu", genre: "combat", note: 83, prix: 39.99, mode: "Solo", annee: 2022, description: "Kung-fu exigeant où chaque mort vieillit le héros.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Death Stranding 2: On the Beach", genre: "aventure", note: 87, prix: 69.99, mode: "Solo", annee: 2025, description: "Sam Porter Bridges traverse un monde fracturé pour relier les survivants.", plateformes: ["ps5"] },
  { titre: "Silent Hill 2 Remake", genre: "horreur", note: 87, prix: 69.99, mode: "Solo", annee: 2024, description: "Refonte du classique horrifique psychologique culte.", plateformes: ["ps5", "pc"] },
  { titre: "Helldivers 2", genre: "action", note: 83, prix: 39.99, mode: "Coopératif", annee: 2024, description: "Coop chaotique contre des hordes extraterrestres pour la Super-Terre.", plateformes: ["ps5", "pc"] },
  { titre: "Frostpunk 2", genre: "gestion", note: 80, prix: 44.99, mode: "Solo", annee: 2024, description: "Gestion de cité glaciale à l'échelle sociétale et politique.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  // Jeux gratuits (free-to-play)
  { titre: "Fortnite", genre: "action", note: 84, prix: 0, mode: "Multijoueur", annee: 2020, description: "Battle royale culte avec constructions et événements réguliers.", plateformes: ["ps5", "ps4", "pc", "xbox", "switch"] },
  { titre: "Call of Duty: Warzone", genre: "action", note: 80, prix: 0, mode: "Multijoueur", annee: 2020, description: "Battle royale nerveux dans l'univers Call of Duty.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Apex Legends", genre: "action", note: 88, prix: 0, mode: "Multijoueur", annee: 2020, description: "Battle royale héroïque en équipes de trois, rythmé et tactique.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Genshin Impact", genre: "rpg", note: 84, prix: 0, mode: "Solo/Multi", annee: 2021, description: "Monde ouvert fantastique avec exploration élémentaire et gacha.", plateformes: ["ps5", "ps4", "pc"] },
  { titre: "Fall Guys", genre: "plateforme", note: 80, prix: 0, mode: "Multijoueur", annee: 2022, description: "Parcours d'obstacles loufoques en battle royale coloré.", plateformes: ["ps5", "ps4", "pc", "xbox", "switch"] },
  { titre: "Rocket League", genre: "sport", note: 86, prix: 0, mode: "Multijoueur", annee: 2020, description: "Football à bord de voitures survitaminées, très compétitif.", plateformes: ["ps5", "ps4", "pc", "xbox", "switch"] },
  { titre: "Destiny 2", genre: "action", note: 83, prix: 0, mode: "Solo/Multi", annee: 2020, description: "Looter-shooter spatial avec raids et campagnes narratives.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "PUBG: Battlegrounds", genre: "action", note: 75, prix: 0, mode: "Multijoueur", annee: 2022, description: "Le battle royale pionnier, tactique et réaliste.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Warframe", genre: "action", note: 80, prix: 0, mode: "Solo/Multi", annee: 2020, description: "Looter-shooter ninja spatial avec un contenu massif et gratuit.", plateformes: ["ps5", "ps4", "pc", "xbox", "switch"] },
  { titre: "Path of Exile", genre: "rpg", note: 85, prix: 0, mode: "Solo/Multi", annee: 2020, description: "Hack'n'slash exigeant à l'arbre de compétences vertigineux.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Brawlhalla", genre: "combat", note: 78, prix: 0, mode: "Multijoueur", annee: 2020, description: "Combat de plateforme façon Smash, simple et accessible.", plateformes: ["ps5", "ps4", "pc", "xbox", "switch"] },
  { titre: "Overwatch 2", genre: "action", note: 79, prix: 0, mode: "Multijoueur", annee: 2022, description: "Tir en équipe basé sur des héros aux capacités variées.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Splitgate", genre: "action", note: 78, prix: 0, mode: "Multijoueur", annee: 2021, description: "FPS arène avec portails façon Portal, rapide et technique.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "MultiVersus", genre: "combat", note: 73, prix: 0, mode: "Multijoueur", annee: 2024, description: "Crossover de combat façon Smash avec des personnages Warner.", plateformes: ["ps5", "ps4", "pc", "xbox", "switch"] },
  { titre: "Roblox", genre: "plateforme", note: 71, prix: 0, mode: "Multijoueur", annee: 2023, description: "Plateforme de mini-jeux créés par la communauté, infiniment variée.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "eFootball", genre: "sport", note: 68, prix: 0, mode: "Multijoueur", annee: 2022, description: "Simulation de football gratuite signée Konami.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "The Sims 4", genre: "gestion", note: 71, prix: 0, mode: "Solo", annee: 2022, description: "Simulation de vie et de gestion de foyer devenue gratuite.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Dauntless", genre: "action", note: 70, prix: 0, mode: "Multijoueur", annee: 2020, description: "Chasse de monstres coopérative façon Monster Hunter, gratuite.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Honkai: Star Rail", genre: "rpg", note: 82, prix: 0, mode: "Solo", annee: 2024, description: "RPG tactique au tour par tour dans un univers spatial gacha.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  // Jeux payants supplémentaires
  { titre: "Cyberpunk 2077", genre: "rpg", note: 86, prix: 49.99, mode: "Solo", annee: 2022, description: "Dystopie cyberpunk à Night City, riche en choix et en action.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "The Witcher 3: Wild Hunt", genre: "rpg", note: 93, prix: 39.99, mode: "Solo", annee: 2022, description: "Geralt de Riv chasse monstres et intrigues dans un monde ouvert dense.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Red Dead Redemption 2", genre: "aventure", note: 96, prix: 59.99, mode: "Solo/Multi", annee: 2020, description: "Épopée western sur le déclin d'un hors-la-loi et de sa bande.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Grand Theft Auto V", genre: "action", note: 92, prix: 19.99, mode: "Solo/Multi", annee: 2022, description: "Trois criminels à Los Santos dans un monde ouvert culte.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Sekiro: Shadows Die Twice", genre: "action", note: 90, prix: 59.99, mode: "Solo", annee: 2020, description: "Duels de samouraï exigeants signés FromSoftware.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Bloodborne", genre: "horreur", note: 92, prix: 19.99, mode: "Solo", annee: 2020, description: "Cauchemar gothique impitoyable dans la ville de Yharnam.", plateformes: ["ps5", "ps4"] },
  { titre: "Demon's Souls", genre: "rpg", note: 92, prix: 69.99, mode: "Solo", annee: 2020, description: "Remake somptueux du souls-like fondateur de FromSoftware.", plateformes: ["ps5"] },
  { titre: "Returnal", genre: "action", note: 86, prix: 69.99, mode: "Solo", annee: 2021, description: "Boucle temporelle sur une planète hostile, en rogue-like intense.", plateformes: ["ps5", "pc"] },
  { titre: "Deathloop", genre: "action", note: 88, prix: 59.99, mode: "Solo", annee: 2021, description: "Assassin coincé dans une boucle temporelle à briser en une journée.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Kena: Bridge of Spirits", genre: "aventure", note: 79, prix: 39.99, mode: "Solo", annee: 2021, description: "Guide spirituelle dans une forêt enchantée, entre calme et combat.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Days Gone", genre: "aventure", note: 71, prix: 19.99, mode: "Solo", annee: 2020, description: "Survie en moto dans un monde infesté de zombies-hordes.", plateformes: ["ps5", "ps4", "pc"] },
  { titre: "Uncharted: Legacy of Thieves Collection", genre: "aventure", note: 85, prix: 49.99, mode: "Solo", annee: 2022, description: "Nathan Drake part à la chasse aux trésors légendaires.", plateformes: ["ps5", "pc"] },
  { titre: "The Last of Us Part I", genre: "histoire", note: 89, prix: 59.99, mode: "Solo", annee: 2022, description: "Joel et Ellie traversent une Amérique post-pandémie déchirante.", plateformes: ["ps5", "pc"] },
  { titre: "Until Dawn", genre: "histoire", note: 79, prix: 29.99, mode: "Solo", annee: 2020, description: "Slasher horrifique interactif où chaque choix compte.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Firewatch", genre: "histoire", note: 81, prix: 14.99, mode: "Solo", annee: 2020, description: "Garde-forestier isolé qui noue un lien radio mystérieux.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "What Remains of Edith Finch", genre: "histoire", note: 89, prix: 19.99, mode: "Solo", annee: 2020, description: "Courtes histoires poétiques sur les membres d'une famille maudite.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Journey", genre: "histoire", note: 92, prix: 14.99, mode: "Solo/Multi", annee: 2020, description: "Traversée contemplative du désert vers une montagne lumineuse.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Slay the Spire", genre: "strategie", note: 89, prix: 24.99, mode: "Solo", annee: 2021, description: "Roguelike de deck-building addictif et stratégique.", plateformes: ["ps5", "ps4", "pc", "xbox", "switch"] },
  { titre: "Civilization VI", genre: "strategie", note: 88, prix: 49.99, mode: "Solo/Multi", annee: 2020, description: "Bâtis un empire à travers les âges, de l'antiquité à l'ère spatiale.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Farming Simulator 22", genre: "gestion", note: 74, prix: 39.99, mode: "Solo/Multi", annee: 2021, description: "Gère une exploitation agricole moderne du semis à la récolte.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Planet Coaster: Console Edition", genre: "gestion", note: 75, prix: 39.99, mode: "Solo", annee: 2020, description: "Construis et gère un parc d'attractions créatif et détaillé.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Cities: Skylines", genre: "gestion", note: 78, prix: 29.99, mode: "Solo", annee: 2020, description: "Urbanisme fin, du réseau routier aux services publics.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Stardew Valley", genre: "gestion", note: 89, prix: 14.99, mode: "Solo/Multi", annee: 2021, description: "Reprends une ferme abandonnée et refais vivre sa vallée.", plateformes: ["ps5", "ps4", "pc", "xbox", "switch"] },
  { titre: "Two Point Campus", genre: "gestion", note: 76, prix: 39.99, mode: "Solo", annee: 2022, description: "Gère un campus universitaire loufoque et ses filières improbables.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Diablo IV", genre: "rpg", note: 86, prix: 69.99, mode: "Solo/Multi", annee: 2023, description: "Hack'n'slash sombre au cœur d'un monde gothique et sanglant.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Dragon's Dogma 2", genre: "rpg", note: 85, prix: 69.99, mode: "Solo", annee: 2024, description: "Monde ouvert avec des pions invocables et un grip system unique.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Monster Hunter World", genre: "action", note: 89, prix: 29.99, mode: "Solo/Multi", annee: 2021, description: "Chasse des monstres colossaux en coopération dans un écosystème vivant.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Monster Hunter Rise", genre: "action", note: 87, prix: 39.99, mode: "Solo/Multi", annee: 2023, description: "Chasses dynamiques avec le Filoreston pour une mobilité verticale.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "NBA 2K24", genre: "sport", note: 76, prix: 69.99, mode: "Multijoueur", annee: 2023, description: "Simulation basketball complète avec carrière et modes en ligne.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "F1 24", genre: "course", note: 82, prix: 69.99, mode: "Solo/Multi", annee: 2024, description: "Simulation officielle de Formule 1 avec mode carrière approfondi.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Need for Speed Unbound", genre: "course", note: 77, prix: 69.99, mode: "Solo/Multi", annee: 2022, description: "Courses urbaines stylisées avec un visuel façon comics.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Mortal Kombat 1", genre: "combat", note: 82, prix: 69.99, mode: "Multijoueur", annee: 2023, description: "Combats brutaux et Fatalities dans une timeline réinventée.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Guilty Gear Strive", genre: "combat", note: 89, prix: 59.99, mode: "Multijoueur", annee: 2021, description: "Combat 2D exigeant à la direction artistique flamboyante.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Dead Space Remake", genre: "horreur", note: 89, prix: 69.99, mode: "Solo", annee: 2023, description: "Refonte terrifiante du survival-horror spatial culte.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Amnesia: The Bunker", genre: "horreur", note: 79, prix: 29.99, mode: "Solo", annee: 2023, description: "Survie horrifique claustrophobe dans un bunker de la Grande Guerre.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Outlast Trials", genre: "horreur", note: 74, prix: 39.99, mode: "Coopératif", annee: 2023, description: "Horreur coopérative où il faut fuir plutôt que combattre.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Little Nightmares II", genre: "horreur", note: 81, prix: 29.99, mode: "Solo", annee: 2021, description: "Conte macabre et onirique en plateforme inquiétante.", plateformes: ["ps5", "ps4", "pc", "xbox", "switch"] },
  { titre: "Hollow Knight", genre: "plateforme", note: 90, prix: 14.99, mode: "Solo", annee: 2020, description: "Metroidvania envoûtant dans un royaume d'insectes déchu.", plateformes: ["ps5", "ps4", "pc", "xbox", "switch"] },
  { titre: "Crash Bandicoot 4", genre: "plateforme", note: 85, prix: 39.99, mode: "Solo", annee: 2020, description: "Retour exigeant et coloré du marsupial le plus rapide de PlayStation.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Sackboy: A Big Adventure", genre: "plateforme", note: 80, prix: 39.99, mode: "Coopératif", annee: 2020, description: "Plateforme familial et créatif avec Sackboy, seul ou en coop.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "LEGO Star Wars: The Skywalker Saga", genre: "aventure", note: 82, prix: 59.99, mode: "Coopératif", annee: 2022, description: "Les neuf épisodes Star Wars revisités en LEGO, humour garanti.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Sea of Thieves", genre: "aventure", note: 76, prix: 39.99, mode: "Multijoueur", annee: 2024, description: "Piraterie coopérative en monde ouvert, entre trésors et abordages.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "No Man's Sky", genre: "aventure", note: 79, prix: 39.99, mode: "Solo/Multi", annee: 2020, description: "Exploration spatiale procédurale infinie, considérablement enrichie depuis sa sortie.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  // Franchises sportives annuelles
  { titre: "FIFA 21", genre: "sport", note: 73, prix: 19.99, mode: "Multijoueur", annee: 2020, description: "Simulation de football, première édition sur PS5.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "FIFA 22", genre: "sport", note: 75, prix: 19.99, mode: "Multijoueur", annee: 2021, description: "Football avec technologie HyperMotion capturée en matchs réels.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "FIFA 23", genre: "sport", note: 79, prix: 29.99, mode: "Multijoueur", annee: 2022, description: "Dernière édition sous le nom FIFA, avec football féminin en Ultimate Team.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "EA Sports FC 25", genre: "sport", note: 78, prix: 69.99, mode: "Multijoueur", annee: 2024, description: "Football nouvelle génération avec le mode Rush à 5 contre 5.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "NBA 2K21", genre: "sport", note: 71, prix: 19.99, mode: "Multijoueur", annee: 2020, description: "Simulation basketball avec mode carrière et Neighborhood.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "NBA 2K22", genre: "sport", note: 75, prix: 19.99, mode: "Multijoueur", annee: 2021, description: "Basketball avec un moteur de mouvement retravaillé.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "NBA 2K23", genre: "sport", note: 75, prix: 29.99, mode: "Multijoueur", annee: 2022, description: "Simulation basketball mettant en avant le mode MyCareer.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "NBA 2K25", genre: "sport", note: 74, prix: 69.99, mode: "Multijoueur", annee: 2024, description: "Basketball avec un nouveau moteur physique ProPLAY.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Madden NFL 21", genre: "sport", note: 68, prix: 19.99, mode: "Multijoueur", annee: 2020, description: "Football américain, débuts de la licence sur PS5.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Madden NFL 22", genre: "sport", note: 71, prix: 19.99, mode: "Multijoueur", annee: 2021, description: "Simulation NFL avec le mode Franchise amélioré.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Madden NFL 23", genre: "sport", note: 74, prix: 29.99, mode: "Multijoueur", annee: 2022, description: "Football américain avec le moteur physique FieldSENSE.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Madden NFL 25", genre: "sport", note: 76, prix: 69.99, mode: "Multijoueur", annee: 2024, description: "Simulation NFL avec une IA défensive retravaillée.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "WWE 2K22", genre: "sport", note: 82, prix: 39.99, mode: "Multijoueur", annee: 2022, description: "Catch simulation avec le mode MyGM et un gameplay repensé.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "WWE 2K23", genre: "sport", note: 83, prix: 49.99, mode: "Multijoueur", annee: 2023, description: "Catch avec le mode WarGames et une liste de superstars étoffée.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "WWE 2K25", genre: "sport", note: 82, prix: 69.99, mode: "Multijoueur", annee: 2025, description: "Catch simulation avec un nouveau mode intergenre.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "NHL 24", genre: "sport", note: 76, prix: 69.99, mode: "Multijoueur", annee: 2023, description: "Simulation de hockey sur glace avec physique de collisions retravaillée.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "MLB The Show 24", genre: "sport", note: 79, prix: 69.99, mode: "Multijoueur", annee: 2024, description: "Simulation de baseball réputée pour son réalisme et son mode carrière.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "PGA Tour 2K23", genre: "sport", note: 76, prix: 59.99, mode: "Multijoueur", annee: 2022, description: "Simulation de golf avec parcours sous licence officielle.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "UFC 5", genre: "combat", note: 79, prix: 69.99, mode: "Multijoueur", annee: 2023, description: "Simulation de MMA avec système de dégâts et fatigue avancé.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "F1 23", genre: "course", note: 84, prix: 69.99, mode: "Solo/Multi", annee: 2023, description: "Formule 1 officielle avec le mode Braking Point narratif.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "F1 25", genre: "course", note: 80, prix: 69.99, mode: "Solo/Multi", annee: 2025, description: "Dernière simulation officielle de Formule 1.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "WRC 23", genre: "course", note: 78, prix: 59.99, mode: "Solo/Multi", annee: 2023, description: "Simulation de rallye officielle avec des étapes très exigeantes.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Tony Hawk's Pro Skater 1+2", genre: "sport", note: 90, prix: 39.99, mode: "Solo/Multi", annee: 2021, description: "Remake culte de skate arcade, nerveux et généreux en tricks.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  // Action / Aventure supplémentaires
  { titre: "Assassin's Creed Valhalla", genre: "aventure", note: 80, prix: 39.99, mode: "Solo", annee: 2020, description: "Épopée viking en monde ouvert entre raids et infiltration.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Assassin's Creed Mirage", genre: "aventure", note: 76, prix: 49.99, mode: "Solo", annee: 2023, description: "Retour aux sources façon infiltration dans le Bagdad du IXe siècle.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Far Cry 6", genre: "action", note: 74, prix: 39.99, mode: "Solo", annee: 2021, description: "Guérilla armée contre un dictateur dans un archipel caribéen fictif.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Watch Dogs: Legion", genre: "action", note: 74, prix: 29.99, mode: "Solo/Multi", annee: 2020, description: "Recrute n'importe quel habitant de Londres pour libérer la ville.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Dying Light 2", genre: "action", note: 77, prix: 49.99, mode: "Solo/Multi", annee: 2022, description: "Parkour et survie zombie dans une ville aux choix impactants.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Control", genre: "action", note: 84, prix: 29.99, mode: "Solo", annee: 2020, description: "Pouvoirs télékinétiques dans un bâtiment gouvernemental instable.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Marvel's Guardians of the Galaxy", genre: "action", note: 83, prix: 29.99, mode: "Solo", annee: 2021, description: "Aventure spatiale déjantée avec Star-Lord et son équipe.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Star Wars Jedi: Survivor", genre: "action", note: 85, prix: 69.99, mode: "Solo", annee: 2023, description: "Cal Kestis affine son sabre laser dans une aventure plus ample.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Star Wars Jedi: Fallen Order", genre: "action", note: 83, prix: 39.99, mode: "Solo", annee: 2020, description: "Un jeune Jedi traqué par l'Empire affine ses pouvoirs de la Force.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Batman: Arkham Knight", genre: "action", note: 87, prix: 19.99, mode: "Solo", annee: 2020, description: "Batman affronte l'Épouvantail dans un Gotham en monde ouvert.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Marvel's Spider-Man: Miles Morales", genre: "action", note: 85, prix: 49.99, mode: "Solo", annee: 2020, description: "Miles endosse le costume dans un New York enneigé pour Noël.", plateformes: ["ps5", "ps4", "pc"] },
  { titre: "Horizon Zero Dawn Remastered", genre: "aventure", note: 82, prix: 49.99, mode: "Solo", annee: 2024, description: "Aloy affronte des machines dans les origines de la saga Horizon.", plateformes: ["ps5", "pc"] },
  { titre: "Death Stranding Director's Cut", genre: "aventure", note: 86, prix: 39.99, mode: "Solo", annee: 2021, description: "Livraisons contemplatives à travers une Amérique fracturée.", plateformes: ["ps5", "pc"] },
  { titre: "Nioh 2", genre: "action", note: 87, prix: 39.99, mode: "Solo/Multi", annee: 2021, description: "Souls-like japonais brutal mêlant samouraïs et yokai.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Ghostwire: Tokyo", genre: "action", note: 76, prix: 39.99, mode: "Solo", annee: 2022, description: "Tokyo vidée de ses habitants, hantée par des esprits surnaturels.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Lies of P", genre: "action", note: 80, prix: 59.99, mode: "Solo", annee: 2023, description: "Réinvention gothique et souls-like de Pinocchio.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Lords of the Fallen", genre: "action", note: 74, prix: 59.99, mode: "Solo/Multi", annee: 2023, description: "Souls-like sombre naviguant entre monde des vivants et des morts.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Remnant II", genre: "action", note: 82, prix: 49.99, mode: "Solo/Multi", annee: 2023, description: "Tir-survie coopératif dans des mondes générés procéduralement.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "A Plague Tale: Innocence", genre: "aventure", note: 82, prix: 29.99, mode: "Solo", annee: 2020, description: "Fuite à travers la France médiévale ravagée par la peste et les rats.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "A Plague Tale: Requiem", genre: "aventure", note: 84, prix: 59.99, mode: "Solo", annee: 2022, description: "Suite sombre et spectaculaire du périple d'Amicia et Hugo.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Hellblade: Senua's Sacrifice", genre: "histoire", note: 82, prix: 24.99, mode: "Solo", annee: 2021, description: "Voyage psychologique intense dans l'esprit d'une guerrière celte.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Ratchet & Clank (2020)", genre: "plateforme", note: 88, prix: 19.99, mode: "Solo", annee: 2020, description: "Remake du classique plateforme-shooter interdimensionnel.", plateformes: ["ps5", "pc"] },
  // RPG / Japon
  { titre: "Final Fantasy XVI", genre: "rpg", note: 87, prix: 69.99, mode: "Solo", annee: 2023, description: "Action-RPG sombre porté par des combats d'Invocations spectaculaires.", plateformes: ["ps5", "pc"] },
  { titre: "Persona 3 Reload", genre: "rpg", note: 88, prix: 69.99, mode: "Solo", annee: 2024, description: "Remake du RPG culte mêlant vie lycéenne et donjon nocturne.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Persona 4 Golden", genre: "rpg", note: 89, prix: 19.99, mode: "Solo", annee: 2023, description: "Enquête et donjons dans une petite ville japonaise mystérieuse.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Yakuza: Like a Dragon", genre: "rpg", note: 85, prix: 39.99, mode: "Solo", annee: 2021, description: "Le Yakuza devient RPG au tour par tour, avec humour et émotion.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Like a Dragon: Infinite Wealth", genre: "rpg", note: 89, prix: 69.99, mode: "Solo", annee: 2024, description: "Suite d'Ichiban Kasuga entre Japon et Hawaï, RPG déjanté.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Tales of Arise", genre: "rpg", note: 87, prix: 39.99, mode: "Solo", annee: 2021, description: "Action-RPG aux combats dynamiques et à la direction artistique éclatante.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Octopath Traveler II", genre: "rpg", note: 87, prix: 59.99, mode: "Solo", annee: 2023, description: "Huit héros, huit histoires, dans un RPG rétro-moderne en HD-2D.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Dragon Quest XI S", genre: "rpg", note: 86, prix: 49.99, mode: "Solo", annee: 2020, description: "RPG classique généreux, entre humour et grande aventure.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Nier: Automata", genre: "rpg", note: 88, prix: 39.99, mode: "Solo", annee: 2021, description: "Androïdes en guerre existentielle dans un monde post-apocalyptique.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Nier Replicant ver.1.22474487139", genre: "rpg", note: 82, prix: 39.99, mode: "Solo", annee: 2021, description: "Préquelle remaniée du RPG culte de Yoko Taro.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Kingdom Hearts III", genre: "rpg", note: 79, prix: 39.99, mode: "Solo", annee: 2020, description: "Sora explore des mondes Disney dans une aventure épique et féerique.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Divinity: Original Sin 2", genre: "rpg", note: 93, prix: 44.99, mode: "Solo/Multi", annee: 2021, description: "RPG tactique coopératif à la liberté narrative immense.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Oxenfree II: Lost Signals", genre: "histoire", note: 79, prix: 19.99, mode: "Solo", annee: 2023, description: "Mystère surnaturel côtier porté par des dialogues naturels.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Life is Strange 2", genre: "histoire", note: 81, prix: 19.99, mode: "Solo", annee: 2020, description: "Deux frères fuient à travers les États-Unis avec un pouvoir mystérieux.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Tell Me Why", genre: "histoire", note: 78, prix: 19.99, mode: "Solo", annee: 2021, description: "Jumeaux qui percent les mystères de leur enfance en Alaska.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  // Indies / plateforme
  { titre: "Celeste", genre: "plateforme", note: 92, prix: 19.99, mode: "Solo", annee: 2021, description: "Plateforme exigeant et touchant sur l'ascension d'une montagne symbolique.", plateformes: ["ps5", "ps4", "pc", "xbox", "switch"] },
  { titre: "Dead Cells", genre: "action", note: 90, prix: 24.99, mode: "Solo", annee: 2020, description: "Rogue-lite metroidvania nerveux avec équipement toujours renouvelé.", plateformes: ["ps5", "ps4", "pc", "xbox", "switch"] },
  { titre: "Cuphead", genre: "action", note: 89, prix: 19.99, mode: "Solo/Multi", annee: 2021, description: "Run-and-gun exigeant à l'animation façon cartoon des années 1930.", plateformes: ["ps5", "ps4", "pc", "xbox", "switch"] },
  { titre: "Hades", genre: "action", note: 93, prix: 24.99, mode: "Solo", annee: 2021, description: "Rogue-like mythologique addictif, écriture et gameplay récompensés.", plateformes: ["ps5", "ps4", "pc", "xbox", "switch"] },
  { titre: "Blasphemous 2", genre: "action", note: 82, prix: 29.99, mode: "Solo", annee: 2023, description: "Metroidvania gothique espagnol impitoyable et esthétique.", plateformes: ["ps5", "ps4", "pc", "xbox", "switch"] },
  { titre: "Ori and the Will of the Wisps", genre: "plateforme", note: 90, prix: 29.99, mode: "Solo", annee: 2023, description: "Plateforme metroidvania somptueux et émouvant.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Katana Zero", genre: "action", note: 85, prix: 14.99, mode: "Solo", annee: 2021, description: "Action ultra-rapide en pixel art où chaque coup est mortel.", plateformes: ["ps5", "ps4", "pc", "xbox", "switch"] },
  { titre: "Spelunky 2", genre: "plateforme", note: 83, prix: 19.99, mode: "Solo/Multi", annee: 2021, description: "Rogue-like exigeant d'exploration de grottes générées aléatoirement.", plateformes: ["ps5", "ps4", "pc", "xbox", "switch"] },
  // Gestion / stratégie supplémentaires
  { titre: "Age of Wonders 4", genre: "strategie", note: 82, prix: 49.99, mode: "Solo/Multi", annee: 2023, description: "4X fantastique où l'on façonne son propre peuple magique.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Two Point Museum", genre: "gestion", note: 78, prix: 39.99, mode: "Solo", annee: 2025, description: "Gère des musées loufoques du fossile de dinosaure à l'art moderne.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Park Beyond", genre: "gestion", note: 68, prix: 49.99, mode: "Solo", annee: 2023, description: "Construction de parcs d'attractions aux manèges impossibles.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Jurassic World Evolution 2", genre: "gestion", note: 78, prix: 49.99, mode: "Solo", annee: 2021, description: "Gère un parc à dinosaures entre science et sécurité des visiteurs.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Prison Architect", genre: "gestion", note: 79, prix: 29.99, mode: "Solo", annee: 2020, description: "Conçois et gère une prison, de la sécurité à la réhabilitation.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Total War: Three Kingdoms", genre: "strategie", note: 88, prix: 59.99, mode: "Solo/Multi", annee: 2023, description: "Stratégie au tour par tour et batailles massives en Chine antique.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "XCOM 2", genre: "strategie", note: 88, prix: 39.99, mode: "Solo", annee: 2020, description: "Tactique au tour par tour contre l'occupation extraterrestre.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  // Horreur supplémentaires
  { titre: "Resident Evil Village", genre: "horreur", note: 84, prix: 39.99, mode: "Solo", annee: 2021, description: "Ethan Winters affronte des créatures gothiques dans un village maudit.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Resident Evil 2 Remake", genre: "horreur", note: 91, prix: 39.99, mode: "Solo", annee: 2020, description: "Refonte terrifiante de Raccoon City assiégée par les morts-vivants.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Resident Evil 3 Remake", genre: "horreur", note: 79, prix: 39.99, mode: "Solo", annee: 2020, description: "Jill Valentine fuit le Nemesis dans une Raccoon City en chute.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Resident Evil 7: Biohazard", genre: "horreur", note: 84, prix: 29.99, mode: "Solo", annee: 2020, description: "Horreur à la première personne dans un manoir familial cauchemardesque.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "The Quarry", genre: "histoire", note: 77, prix: 39.99, mode: "Solo/Multi", annee: 2022, description: "Slasher interactif à choix multiples dans un camp de vacances.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "The Dark Pictures: House of Ashes", genre: "horreur", note: 74, prix: 29.99, mode: "Solo/Multi", annee: 2021, description: "Horreur interactive entre soldats et créatures anciennes en Irak.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Alien: Isolation", genre: "horreur", note: 81, prix: 19.99, mode: "Solo", annee: 2020, description: "Traque oppressante par un Xénomorphe imprévisible sur une station.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Dead by Daylight", genre: "horreur", note: 77, prix: 34.99, mode: "Multijoueur", annee: 2020, description: "Asymétrique 4 contre 1 entre survivants et tueur emblématique.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  // Combat supplémentaires
  { titre: "Dragon Ball: Sparking Zero", genre: "combat", note: 83, prix: 69.99, mode: "Multijoueur", annee: 2024, description: "Combats aériens spectaculaires fidèles à l'anime Dragon Ball.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Dragon Ball FighterZ", genre: "combat", note: 87, prix: 29.99, mode: "Multijoueur", annee: 2020, description: "Combat 2D en équipe à l'animation proche de l'anime.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "The King of Fighters XV", genre: "combat", note: 82, prix: 49.99, mode: "Multijoueur", annee: 2022, description: "Combats d'équipe de 3 à la technicité redoutée des habitués.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  // Coopératif supplémentaires
  { titre: "Split Fiction", genre: "aventure", note: 90, prix: 49.99, mode: "Coopératif", annee: 2025, description: "Deux autrices piégées dans leurs propres mondes fictifs, en coop pure.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "We Were Here Forever", genre: "aventure", note: 78, prix: 19.99, mode: "Coopératif", annee: 2022, description: "Énigmes coopératives où la communication est la seule arme.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Trine 5: A Clockwork Conspiracy", genre: "plateforme", note: 74, prix: 39.99, mode: "Coopératif", annee: 2023, description: "Plateforme-puzzle féerique à trois héros complémentaires.", plateformes: ["ps5", "ps4", "pc", "xbox", "switch"] },
  { titre: "Chained Together", genre: "plateforme", note: 76, prix: 9.99, mode: "Coopératif", annee: 2024, description: "Ascension coopérative où les joueurs sont enchaînés les uns aux autres.", plateformes: ["ps5", "ps4", "pc", "xbox", "switch"] },
  // Ajouts issus de la grande liste communautaire
  { titre: "God of War (2018)", genre: "aventure", note: 94, prix: 19.99, mode: "Solo", annee: 2022, description: "Kratos et Atreus débutent leur périple nordique, référence absolue du genre.", plateformes: ["ps5", "pc"] },
  { titre: "Uncharted 4: A Thief's End", genre: "aventure", note: 93, prix: 19.99, mode: "Solo", annee: 2022, description: "Nathan Drake part pour une dernière chasse au trésor pirate.", plateformes: ["ps5", "ps4", "pc"] },
  { titre: "Uncharted: The Lost Legacy", genre: "aventure", note: 85, prix: 19.99, mode: "Solo", annee: 2022, description: "Chloe et Nadine explorent l'Inde à la recherche d'une défense sacrée.", plateformes: ["ps5", "ps4", "pc"] },
  { titre: "Marvel's Spider-Man", genre: "action", note: 87, prix: 19.99, mode: "Solo", annee: 2022, description: "Peter Parker protège New York dans l'aventure fondatrice de la saga.", plateformes: ["ps5", "ps4", "pc"] },
  { titre: "Middle-earth: Shadow of War", genre: "action", note: 81, prix: 19.99, mode: "Solo", annee: 2020, description: "Domine l'armée de Mordor grâce au système Némésis.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Assassin's Creed Odyssey", genre: "aventure", note: 85, prix: 29.99, mode: "Solo/Multi", annee: 2020, description: "Épopée en Grèce antique aux choix narratifs marqués.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Assassin's Creed Origins", genre: "aventure", note: 83, prix: 19.99, mode: "Solo", annee: 2020, description: "Naissance de la confrérie dans l'Égypte ptolémaïque.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Devil May Cry 5", genre: "action", note: 88, prix: 29.99, mode: "Solo", annee: 2020, description: "Action stylée et nerveuse avec Dante, Nero et V.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Dark Souls III", genre: "action", note: 89, prix: 29.99, mode: "Solo/Multi", annee: 2020, description: "Conclusion punitive et vertigineuse de la trilogie Dark Souls.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Dark Souls Remastered", genre: "action", note: 83, prix: 19.99, mode: "Solo/Multi", annee: 2020, description: "Le souls-like fondateur, exigeant et interconnecté.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Scarlet Nexus", genre: "action", note: 75, prix: 39.99, mode: "Solo", annee: 2021, description: "Action psychokinétique à l'esthétique manga vibrante.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Stranger of Paradise: Final Fantasy Origin", genre: "rpg", note: 71, prix: 59.99, mode: "Solo/Multi", annee: 2022, description: "Souls-like déjanté revisitant les origines de Final Fantasy.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Final Fantasy VII Remake", genre: "rpg", note: 87, prix: 49.99, mode: "Solo", annee: 2020, description: "Refonte du classique culte, entre action et tactique en temps réel.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Darksiders III", genre: "action", note: 65, prix: 29.99, mode: "Solo", annee: 2020, description: "Fury chasse les péchés capitaux dans un monde apocalyptique.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Prince of Persia: The Lost Crown", genre: "plateforme", note: 85, prix: 49.99, mode: "Solo", annee: 2024, description: "Metroidvania acrobatique au level design remarqué.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Deliver Us Mars", genre: "aventure", note: 67, prix: 29.99, mode: "Solo", annee: 2023, description: "Aventure spatiale sur les traces d'une mission martienne disparue.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Final Fantasy XV", genre: "rpg", note: 81, prix: 19.99, mode: "Solo", annee: 2020, description: "Road trip royal entre amitié, combats en temps réel et open world.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Final Fantasy X/X-2 HD Remaster", genre: "rpg", note: 83, prix: 19.99, mode: "Solo", annee: 2020, description: "Le RPG culte de Spira et sa suite, remasterisés.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Final Fantasy XII: The Zodiac Age", genre: "rpg", note: 83, prix: 19.99, mode: "Solo", annee: 2020, description: "Système de combat en temps semi-réel et vaste monde d'Ivalice.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Dragon Quest Builders 2", genre: "gestion", note: 80, prix: 39.99, mode: "Solo/Multi", annee: 2020, description: "Construction et survie dans l'univers coloré de Dragon Quest.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Dragon's Dogma: Dark Arisen", genre: "rpg", note: 81, prix: 29.99, mode: "Solo", annee: 2020, description: "Action-RPG culte avec des Pions invocables, précurseur du 2.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Star Ocean: The Second Story R", genre: "rpg", note: 80, prix: 49.99, mode: "Solo", annee: 2024, description: "Remake d'un JRPG culte des années 90, combats en temps réel.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Tales of Berseria", genre: "rpg", note: 80, prix: 29.99, mode: "Solo", annee: 2020, description: "JRPG sur la vengeance d'une héroïne pirate hors normes.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Tales of Vesperia", genre: "rpg", note: 80, prix: 29.99, mode: "Solo", annee: 2020, description: "Classique JRPG de la saga Tales, chaleureux et généreux.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Ni no Kuni II: Revenant Kingdom", genre: "rpg", note: 78, prix: 29.99, mode: "Solo", annee: 2020, description: "Un jeune roi rebâtit son royaume dans un RPG coloré façon Ghibli.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Ni no Kuni: Wrath of the White Witch", genre: "rpg", note: 85, prix: 19.99, mode: "Solo", annee: 2020, description: "RPG féerique coécrit avec le Studio Ghibli, remasterisé.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Mass Effect Legendary Edition", genre: "rpg", note: 85, prix: 39.99, mode: "Solo", annee: 2021, description: "La trilogie spatiale culte remasterisée, choix et conséquences.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Granblue Fantasy: Relink", genre: "rpg", note: 75, prix: 59.99, mode: "Solo/Multi", annee: 2024, description: "Action-RPG coopératif à l'animation flamboyante.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Call of Duty: Modern Warfare III", genre: "action", note: 65, prix: 69.99, mode: "Multijoueur", annee: 2023, description: "Campagne courte et multijoueur nerveux dans l'univers CoD moderne.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Call of Duty: Black Ops Cold War", genre: "action", note: 75, prix: 29.99, mode: "Multijoueur", annee: 2020, description: "Guerre froide et espionnage dans un FPS militaire classique.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Battlefield 2042", genre: "action", note: 67, prix: 39.99, mode: "Multijoueur", annee: 2021, description: "Batailles massives à grande échelle avec météo dynamique.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Rainbow Six Siege", genre: "action", note: 79, prix: 19.99, mode: "Multijoueur", annee: 2020, description: "Tir tactique destructible en 5 contre 5, très compétitif.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Titanfall 2", genre: "action", note: 89, prix: 19.99, mode: "Solo/Multi", annee: 2020, description: "FPS nerveux au pilotage de Titans et campagne solo remarquée.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Doom Eternal", genre: "action", note: 88, prix: 29.99, mode: "Solo", annee: 2020, description: "Défouloir démoniaque ultra rapide et brutal.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Doom (2016)", genre: "action", note: 85, prix: 19.99, mode: "Solo", annee: 2020, description: "Renaissance du FPS culte, rapide et sans temps mort.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Borderlands 3", genre: "action", note: 81, prix: 19.99, mode: "Solo/Multi", annee: 2020, description: "Looter-shooter déjanté avec des millions d'armes à looter.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Wolfenstein: The New Order", genre: "action", note: 79, prix: 19.99, mode: "Solo", annee: 2020, description: "BJ Blazkowicz combat un régime nazi uchronique.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Wolfenstein II: The New Colossus", genre: "action", note: 81, prix: 19.99, mode: "Solo", annee: 2020, description: "Résistance armée dans une Amérique occupée, satire mordante.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Gran Turismo Sport", genre: "course", note: 80, prix: 19.99, mode: "Solo/Multi", annee: 2020, description: "Simulation de course tournée vers l'e-sport et le fair-play.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Need for Speed Heat", genre: "course", note: 73, prix: 29.99, mode: "Solo/Multi", annee: 2020, description: "Courses de jour légales et de nuit illégales dans Palm City.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Need for Speed Payback", genre: "course", note: 68, prix: 19.99, mode: "Solo/Multi", annee: 2020, description: "Braquages et poursuites spectaculaires dans le désert du Fortune Valley.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Burnout Paradise Remastered", genre: "course", note: 81, prix: 19.99, mode: "Solo/Multi", annee: 2020, description: "Arcade destructrice culte en monde ouvert, remasterisée.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "WipEout Omega Collection", genre: "course", note: 80, prix: 19.99, mode: "Solo/Multi", annee: 2020, description: "Course anti-gravité futuriste ultra nerveuse, trilogie réunie.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "DiRT 5", genre: "course", note: 71, prix: 29.99, mode: "Solo/Multi", annee: 2020, description: "Rallye arcade spectaculaire sur terrains variés et conditions extrêmes.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "DiRT Rally 2.0", genre: "course", note: 83, prix: 29.99, mode: "Solo/Multi", annee: 2020, description: "Simulation de rallye exigeante, réputée pour son réalisme.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Hot Wheels Unleashed", genre: "course", note: 78, prix: 39.99, mode: "Solo/Multi", annee: 2021, description: "Courses de voitures miniatures sur circuits acrobatiques faits maison.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Hot Wheels Unleashed 2", genre: "course", note: 76, prix: 49.99, mode: "Solo/Multi", annee: 2023, description: "Suite avec circuits en intérieur et extérieur toujours plus fous.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "LittleBigPlanet 3", genre: "plateforme", note: 75, prix: 19.99, mode: "Solo/Multi", annee: 2020, description: "Plateforme créatif où l'on construit ses propres niveaux.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Crash Team Racing Nitro-Fueled", genre: "course", note: 85, prix: 29.99, mode: "Solo/Multi", annee: 2020, description: "Remake du kart-racing culte avec tout le casting Crash.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Spyro Reignited Trilogy", genre: "plateforme", note: 79, prix: 29.99, mode: "Solo", annee: 2020, description: "Les trois premiers Spyro remasterisés avec amour.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Blasphemous", genre: "action", note: 79, prix: 24.99, mode: "Solo", annee: 2020, description: "Metroidvania gothique espagnol à l'ambiance macabre et exigeante.", plateformes: ["ps5", "ps4", "pc", "xbox", "switch"] },
  { titre: "Layers of Fear", genre: "horreur", note: 72, prix: 19.99, mode: "Solo", annee: 2020, description: "Horreur psychologique dans le manoir d'un peintre obsédé.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Visage", genre: "horreur", note: 75, prix: 24.99, mode: "Solo", annee: 2020, description: "Horreur psychologique lente et oppressante dans une maison hantée.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "The Dark Pictures: Man of Medan", genre: "horreur", note: 68, prix: 29.99, mode: "Solo/Multi", annee: 2020, description: "Horreur interactive sur un navire fantôme, à choix multiples.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "The Dark Pictures: Little Hope", genre: "horreur", note: 70, prix: 29.99, mode: "Solo/Multi", annee: 2020, description: "Cinq amis piégés dans une ville hantée par son passé.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "The Dark Pictures: The Devil in Me", genre: "horreur", note: 73, prix: 39.99, mode: "Solo/Multi", annee: 2022, description: "Slasher interactif inspiré d'un tueur en série réel.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Outlast", genre: "horreur", note: 80, prix: 19.99, mode: "Solo", annee: 2020, description: "Survie horrifique à l'asile, sans arme, juste une caméra.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Outlast 2", genre: "horreur", note: 73, prix: 19.99, mode: "Solo", annee: 2020, description: "Cauchemar rural et sectaire, suite oppressante d'Outlast.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "SOMA", genre: "horreur", note: 82, prix: 19.99, mode: "Solo", annee: 2020, description: "Horreur philosophique sous-marine sur la conscience et l'identité.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Dying Light", genre: "action", note: 74, prix: 19.99, mode: "Solo/Multi", annee: 2020, description: "Parkour et zombies de jour comme de nuit, premier épisode culte.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "XCOM: Enemy Unknown", genre: "strategie", note: 89, prix: 19.99, mode: "Solo", annee: 2020, description: "Tactique au tour par tour contre une invasion extraterrestre.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Into the Breach", genre: "strategie", note: 89, prix: 14.99, mode: "Solo", annee: 2021, description: "Puzzle tactique minimaliste sur grille, redoutablement malin.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Terraria", genre: "gestion", note: 83, prix: 14.99, mode: "Solo/Multi", annee: 2021, description: "Bac à sable 2D d'exploration, de craft et de construction.", plateformes: ["ps5", "ps4", "pc", "xbox", "switch"] },
  { titre: "Minecraft", genre: "gestion", note: 83, prix: 29.99, mode: "Solo/Multi", annee: 2020, description: "Le bac à sable de construction le plus connu au monde.", plateformes: ["ps5", "ps4", "pc", "xbox", "switch"] },
  { titre: "Abzû", genre: "histoire", note: 81, prix: 19.99, mode: "Solo", annee: 2020, description: "Exploration sous-marine contemplative et visuellement sublime.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "The Artful Escape", genre: "histoire", note: 79, prix: 19.99, mode: "Solo", annee: 2021, description: "Voyage psychédélique et musical d'un adolescent en quête d'identité.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Limbo", genre: "histoire", note: 90, prix: 9.99, mode: "Solo", annee: 2020, description: "Plateforme-puzzle en noir et blanc, aussi court qu'inoubliable.", plateformes: ["ps5", "ps4", "pc", "xbox", "switch"] },
  { titre: "Inside", genre: "histoire", note: 88, prix: 19.99, mode: "Solo", annee: 2020, description: "Fable dystopique glaçante des créateurs de Limbo.", plateformes: ["ps5", "ps4", "pc", "xbox", "switch"] },
  { titre: "Telling Lies", genre: "histoire", note: 72, prix: 19.99, mode: "Solo", annee: 2020, description: "Enquête narrative en vidéos réelles à assembler comme un puzzle.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Tacoma", genre: "histoire", note: 79, prix: 14.99, mode: "Solo", annee: 2020, description: "Mystère spatial reconstitué à travers des enregistrements d'IA.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "The Stanley Parable: Ultra Deluxe", genre: "histoire", note: 85, prix: 19.99, mode: "Solo", annee: 2022, description: "Satire narrative méta sur le libre arbitre et le jeu vidéo lui-même.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "The Pathless", genre: "aventure", note: 79, prix: 29.99, mode: "Solo", annee: 2020, description: "Archère mystique fluide entre course et énigmes dans une île maudite.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Ghostrunner", genre: "action", note: 78, prix: 29.99, mode: "Solo", annee: 2021, description: "Parkour cyberpunk à un coup mortel, rapide et exigeant.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Tom Clancy's Ghost Recon Wildlands", genre: "action", note: 74, prix: 19.99, mode: "Solo/Multi", annee: 2020, description: "Guérilla tactique en monde ouvert contre un cartel bolivien.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Deep Rock Galactic", genre: "action", note: 85, prix: 29.99, mode: "Multijoueur", annee: 2022, description: "Coopération minière naine contre hordes d'insectoïdes.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Remnant: From the Ashes", genre: "action", note: 73, prix: 19.99, mode: "Solo/Multi", annee: 2020, description: "Tir-survie coopératif contre des boss dans des mondes procéduraux.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Metal Gear Solid V: The Phantom Pain", genre: "action", note: 93, prix: 19.99, mode: "Solo", annee: 2020, description: "Infiltration en monde ouvert culte signée Hideo Kojima.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "The Last of Us Remastered", genre: "histoire", note: 95, prix: 19.99, mode: "Solo", annee: 2020, description: "Le premier chapitre culte de Joel et Ellie, remasterisé.", plateformes: ["ps5", "ps4"] },
  { titre: "The Elder Scrolls V: Skyrim", genre: "rpg", note: 85, prix: 29.99, mode: "Solo", annee: 2021, description: "Monde ouvert fantastique légendaire, dragons et guildes à foison.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Fallout 4", genre: "rpg", note: 84, prix: 19.99, mode: "Solo", annee: 2020, description: "Reconstruction post-apocalyptique dans le Massachusetts dévasté.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Fallout 76", genre: "rpg", note: 68, prix: 29.99, mode: "Multijoueur", annee: 2020, description: "Survie post-apocalyptique en ligne, très améliorée depuis sa sortie.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Fallout: New Vegas", genre: "rpg", note: 84, prix: 19.99, mode: "Solo", annee: 2020, description: "RPG post-apo culte au récit riche en factions et embranchements.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Horizon Call of the Mountain", genre: "aventure", note: 75, prix: 49.99, mode: "Solo", annee: 2023, description: "Escalade et tir à l'arc en réalité virtuelle dans l'univers Horizon.", plateformes: ["ps5"] },
  { titre: "Beat Saber", genre: "sport", note: 87, prix: 29.99, mode: "Solo", annee: 2023, description: "Rythme et sabres laser en réalité virtuelle, ultra populaire.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Pistol Whip", genre: "action", note: 84, prix: 29.99, mode: "Solo", annee: 2023, description: "Tir rythmique en réalité virtuelle façon clip d'action stylisé.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Moss", genre: "aventure", note: 81, prix: 29.99, mode: "Solo", annee: 2023, description: "Aventure adorable en réalité virtuelle où l'on guide une petite souris.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  // Nouveau lot : jeux service, indés, suites additionnelles
  { titre: "Sea of Stars", genre: "rpg", note: 88, prix: 34.99, mode: "Solo", annee: 2023, description: "RPG rétro-inspiré au tour par tour à la direction artistique soignée.", plateformes: ["ps5", "ps4", "pc", "xbox", "switch"] },
  { titre: "Chrono Trigger-like Cassette Beasts", genre: "rpg", note: 82, prix: 24.99, mode: "Solo/Multi", annee: 2023, description: "Capture et fusion de créatures dans un RPG à monstres original.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Rogue Legacy 2", genre: "action", note: 87, prix: 24.99, mode: "Solo", annee: 2023, description: "Rogue-lite generationnel avec des héritiers toujours différents.", plateformes: ["ps5", "ps4", "pc", "xbox", "switch"] },
  { titre: "Vampire Survivors", genre: "action", note: 84, prix: 4.99, mode: "Solo", annee: 2023, description: "Survie minimaliste addictive contre des vagues de monstres.", plateformes: ["ps5", "ps4", "pc", "xbox", "switch"] },
  { titre: "Cocoon", genre: "histoire", note: 88, prix: 24.99, mode: "Solo", annee: 2023, description: "Puzzle-aventure ingénieux à base de mondes imbriqués.", plateformes: ["ps5", "ps4", "pc", "xbox", "switch"] },
  { titre: "Pizza Tower", genre: "plateforme", note: 87, prix: 19.99, mode: "Solo", annee: 2024, description: "Plateforme frénétique et déjanté façon cartoon des années 90.", plateformes: ["ps5", "ps4", "pc", "xbox", "switch"] },
  { titre: "Hi-Fi Rush", genre: "action", note: 87, prix: 29.99, mode: "Solo", annee: 2024, description: "Action rythmée où chaque coup s'aligne sur la musique.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Immortals of Aveum", genre: "action", note: 66, prix: 69.99, mode: "Solo", annee: 2023, description: "FPS de magie dans un monde en guerre, sorts en guise d'armes.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Baldur's Gate 3: Digital Deluxe", genre: "rpg", note: 96, prix: 69.99, mode: "Solo/Multi", annee: 2023, description: "Édition enrichie du RPG tactique le plus salué de sa génération.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Wo Long: Fallen Dynasty", genre: "action", note: 78, prix: 59.99, mode: "Solo/Multi", annee: 2023, description: "Souls-like en Chine des Trois Royaumes, avec système de parade dynamique.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Diablo III: Eternal Collection", genre: "rpg", note: 84, prix: 39.99, mode: "Solo/Multi", annee: 2020, description: "Hack'n'slash culte avec toutes ses extensions réunies.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Path of Exile 2", genre: "rpg", note: 87, prix: 0, mode: "Solo/Multi", annee: 2025, description: "Hack'n'slash gratuit à la profondeur redoutable, suite tant attendue.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Marvel Rivals", genre: "action", note: 81, prix: 0, mode: "Multijoueur", annee: 2024, description: "Tir en équipe gratuit avec des héros et vilains Marvel emblématiques.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Enshrouded", genre: "aventure", note: 82, prix: 29.99, mode: "Solo/Multi", annee: 2025, description: "Survie et construction coopérative dans un monde de fantasy brumeux.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Valheim", genre: "aventure", note: 88, prix: 24.99, mode: "Solo/Multi", annee: 2024, description: "Survie viking coopérative dans un purgatoire mythologique généré.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "V Rising", genre: "action", note: 84, prix: 24.99, mode: "Solo/Multi", annee: 2024, description: "Survie vampirique en monde ouvert, du cercueil au château fort.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Palworld", genre: "aventure", note: 78, prix: 29.99, mode: "Solo/Multi", annee: 2025, description: "Survie et capture de créatures mêlant élevage et artisanat armé.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Lethal Company-like Content Warning", genre: "action", note: 78, prix: 9.99, mode: "Coopératif", annee: 2024, description: "Coopération horrifique et absurde pour filmer des monstres.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Balatro", genre: "strategie", note: 92, prix: 14.99, mode: "Solo", annee: 2024, description: "Roguelike de poker absurdement addictif aux combinaisons infinies.", plateformes: ["ps5", "ps4", "pc", "xbox", "switch"] },
  { titre: "Cult of the Lamb", genre: "gestion", note: 84, prix: 24.99, mode: "Solo", annee: 2022, description: "Gère une secte tout en explorant des donjons en rogue-lite.", plateformes: ["ps5", "ps4", "pc", "xbox", "switch"] },
  { titre: "Against the Storm", genre: "gestion", note: 87, prix: 24.99, mode: "Solo", annee: 2024, description: "Gestion de ville roguelite dans une forêt hostile et pluvieuse.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Manor Lords", genre: "gestion", note: 80, prix: 34.99, mode: "Solo", annee: 2025, description: "Bâtisseur médiéval mêlant urbanisme et stratégie militaire.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Songs of Conquest", genre: "strategie", note: 80, prix: 29.99, mode: "Solo/Multi", annee: 2024, description: "Stratégie au tour par tour à l'héritage Heroes of Might and Magic.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Unicorn Overlord", genre: "strategie", note: 87, prix: 59.99, mode: "Solo", annee: 2024, description: "Tactique-RPG somptueux mêlant recrutement d'armées et diplomatie.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Tactics Ogre: Reborn", genre: "strategie", note: 84, prix: 49.99, mode: "Solo", annee: 2022, description: "Tactique-RPG culte à la narration politique dense, remasterisé.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Bramble: The Mountain King", genre: "horreur", note: 71, prix: 24.99, mode: "Solo", annee: 2023, description: "Conte scandinave sombre où un enfant traverse une forêt hantée.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Choo-Choo Charles", genre: "horreur", note: 71, prix: 19.99, mode: "Solo", annee: 2023, description: "Fuis une locomotive-araignée monstrueuse en monde ouvert.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Still Wakes the Deep", genre: "horreur", note: 79, prix: 29.99, mode: "Solo", annee: 2024, description: "Horreur narrative sur une plateforme pétrolière écossaise isolée.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Indika", genre: "histoire", note: 78, prix: 19.99, mode: "Solo", annee: 2024, description: "Voyage surréaliste et introspectif d'une nonne russe du XIXe siècle.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Harold Halibut", genre: "histoire", note: 78, prix: 39.99, mode: "Solo", annee: 2024, description: "Aventure narrative en stop-motion à bord d'un vaisseau englouti.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Thirsty Suitors", genre: "histoire", note: 75, prix: 24.99, mode: "Solo", annee: 2023, description: "Comédie romantique mêlant combats et rencontres avec des ex.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Alan Wake's American Nightmare", genre: "horreur", note: 74, prix: 14.99, mode: "Solo", annee: 2020, description: "Épisode annexe plus arcade de la saga Alan Wake.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Quantum Break", genre: "action", note: 78, prix: 19.99, mode: "Solo", annee: 2020, description: "Manipulation du temps mêlée à une série télé interactive.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Rise of the Tomb Raider", genre: "aventure", note: 86, prix: 19.99, mode: "Solo", annee: 2020, description: "Lara Croft explore la Sibérie à la recherche d'une cité perdue.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Shadow of the Tomb Raider", genre: "aventure", note: 79, prix: 19.99, mode: "Solo", annee: 2020, description: "Conclusion de la trilogie reboot, entre jungle et apocalypse maya.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Mafia: Definitive Edition", genre: "aventure", note: 80, prix: 29.99, mode: "Solo", annee: 2020, description: "Remake du classique mafieux des années 30, drame et gunfights.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Mafia III: Definitive Edition", genre: "aventure", note: 65, prix: 29.99, mode: "Solo", annee: 2020, description: "Vengeance criminelle dans une Nouvelle-Orléans fictive des années 60.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Just Cause 4", genre: "action", note: 63, prix: 19.99, mode: "Solo", annee: 2020, description: "Chaos explosif en monde ouvert avec grappin et parachute.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Sniper Elite 5", genre: "action", note: 79, prix: 49.99, mode: "Solo/Multi", annee: 2022, description: "Tir de précision tactique en France occupée, avec ralenti anatomique.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Hitman: World of Assassination", genre: "action", note: 86, prix: 39.99, mode: "Solo", annee: 2023, description: "Trilogie complète de l'Agent 47, infiltration et assassinats créatifs.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Dishonored 2", genre: "action", note: 86, prix: 19.99, mode: "Solo", annee: 2020, description: "Infiltration surnaturelle avec pouvoirs et niveaux non-linéaires.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Prey (2017)", genre: "action", note: 83, prix: 19.99, mode: "Solo", annee: 2020, description: "Immersive sim sur une station spatiale infestée d'aliens mimétiques.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "The Evil Within 2", genre: "horreur", note: 79, prix: 19.99, mode: "Solo", annee: 2020, description: "Survival-horror cauchemardesque dans un monde virtuel instable.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Observer: System Redux", genre: "horreur", note: 78, prix: 29.99, mode: "Solo", annee: 2020, description: "Horreur cyberpunk où l'on hacke les esprits pour enquêter.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Signalis", genre: "horreur", note: 82, prix: 19.99, mode: "Solo", annee: 2023, description: "Survival-horror rétro en pixel art, hommage assumé à Silent Hill.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Crow Country", genre: "horreur", note: 80, prix: 19.99, mode: "Solo", annee: 2024, description: "Survival-horror façon PS1 dans un parc d'attractions abandonné.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Sons of the Forest", genre: "horreur", note: 79, prix: 34.99, mode: "Solo/Multi", annee: 2024, description: "Survie coopérative sur une île peuplée de créatures mutantes.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "The Forest", genre: "horreur", note: 81, prix: 19.99, mode: "Solo/Multi", annee: 2022, description: "Survie sur une île cannibale, entre construction et horreur.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Green Hell", genre: "horreur", note: 75, prix: 29.99, mode: "Solo/Multi", annee: 2021, description: "Survie réaliste en pleine jungle amazonienne hostile.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Ark: Survival Ascended", genre: "aventure", note: 68, prix: 44.99, mode: "Solo/Multi", annee: 2024, description: "Survie et apprivoisement de dinosaures en monde ouvert.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Conan Exiles", genre: "aventure", note: 74, prix: 39.99, mode: "Solo/Multi", annee: 2020, description: "Survie brutale dans les terres arides de l'univers de Conan.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Grounded", genre: "aventure", note: 82, prix: 29.99, mode: "Solo/Multi", annee: 2023, description: "Survie miniaturisée dans un jardin devenu monde hostile géant.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Core Keeper", genre: "aventure", note: 81, prix: 14.99, mode: "Solo/Multi", annee: 2024, description: "Survie et minage 2D dans des cavernes générées procéduralement.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Dredge", genre: "horreur", note: 82, prix: 24.99, mode: "Solo", annee: 2023, description: "Pêche horrifique en bateau dans des eaux qui cachent des secrets.", plateformes: ["ps5", "ps4", "pc", "xbox", "switch"] },
  { titre: "Bugsnax", genre: "aventure", note: 76, prix: 19.99, mode: "Solo", annee: 2020, description: "Chasse de créatures mi-insectes mi-snacks sur une île étrange.", plateformes: ["ps5", "ps4", "pc", "xbox", "switch"] },
  { titre: "Sable", genre: "aventure", note: 74, prix: 24.99, mode: "Solo", annee: 2021, description: "Exploration contemplative en glisse sur une planète désertique.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Season: A Letter to the Future", genre: "histoire", note: 82, prix: 29.99, mode: "Solo", annee: 2023, description: "Voyage à vélo pour immortaliser un monde qui va disparaître.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Lake", genre: "histoire", note: 74, prix: 19.99, mode: "Solo", annee: 2021, description: "Vie tranquille de factrice dans une petite ville américaine des années 80.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "A Short Hike", genre: "aventure", note: 87, prix: 9.99, mode: "Solo", annee: 2021, description: "Courte escapade relaxante vers le sommet d'une montagne.", plateformes: ["ps5", "ps4", "pc", "xbox", "switch"] },
  { titre: "Venba", genre: "histoire", note: 80, prix: 12.99, mode: "Solo", annee: 2023, description: "Cuisine et transmission familiale au cœur d'un récit sur l'immigration.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Chants of Sennaar", genre: "histoire", note: 83, prix: 22.99, mode: "Solo", annee: 2023, description: "Puzzle de déchiffrement de langues entre civilisations isolées.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Animal Well", genre: "plateforme", note: 89, prix: 24.99, mode: "Solo", annee: 2024, description: "Metroidvania énigmatique et minimaliste aux mécaniques ingénieuses.", plateformes: ["ps5", "ps4", "pc", "xbox", "switch"] },
  { titre: "Neva", genre: "aventure", note: 82, prix: 24.99, mode: "Solo", annee: 2024, description: "Plateforme poétique où l'on protège une louve à travers les saisons.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Braid, Anniversary Edition", genre: "plateforme", note: 81, prix: 19.99, mode: "Solo", annee: 2024, description: "Puzzle-plateforme culte sur la manipulation du temps, remasterisé.", plateformes: ["ps5", "ps4", "pc", "xbox", "switch"] },
  { titre: "Grime", genre: "action", note: 76, prix: 19.99, mode: "Solo", annee: 2021, description: "Metroidvania sombre où l'on absorbe les ennemis pour se transformer.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "F1 Manager 2024", genre: "gestion", note: 74, prix: 49.99, mode: "Solo/Multi", annee: 2024, description: "Gère une écurie de Formule 1 de la stratégie aux négociations.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Motorsport Manager", genre: "gestion", note: 78, prix: 29.99, mode: "Solo", annee: 2021, description: "Gestion d'écurie de course automobile, stratégie de course incluse.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Football Manager 2024 Console", genre: "gestion", note: 76, prix: 49.99, mode: "Solo", annee: 2023, description: "Version console du célèbre simulateur de gestion de club.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Story of Seasons: A Wonderful Life", genre: "gestion", note: 76, prix: 49.99, mode: "Solo", annee: 2023, description: "Simulation de vie agricole et familiale sur plusieurs générations.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Disney Dreamlight Valley", genre: "gestion", note: 75, prix: 0, mode: "Solo/Multi", annee: 2023, description: "Simulation de vie gratuite peuplée de personnages Disney et Pixar.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "My Time at Sandrock", genre: "gestion", note: 78, prix: 29.99, mode: "Solo/Multi", annee: 2023, description: "Artisanat et reconstruction d'une ville du désert post-apocalyptique.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Islanders", genre: "gestion", note: 79, prix: 14.99, mode: "Solo", annee: 2021, description: "Urbanisme minimaliste et zen sur des îles procédurales.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  // Nouveau lot : simulation, multijoueur en ligne, VR
  { titre: "Microsoft Flight Simulator", genre: "gestion", note: 87, prix: 69.99, mode: "Solo/Multi", annee: 2024, description: "Simulation de vol ultra réaliste avec la planète entière modélisée.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Euro Truck Simulator 2", genre: "gestion", note: 78, prix: 29.99, mode: "Solo/Multi", annee: 2024, description: "Simulation de transport routier à travers l'Europe, relaxante et précise.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "House Flipper 2", genre: "gestion", note: 74, prix: 34.99, mode: "Solo/Multi", annee: 2023, description: "Rénove et revends des maisons dans une simulation détendue.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "PowerWash Simulator", genre: "gestion", note: 79, prix: 24.99, mode: "Solo/Multi", annee: 2023, description: "Nettoyage au karcher méthodique et étrangement relaxant.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Goat Simulator 3", genre: "gestion", note: 74, prix: 39.99, mode: "Solo/Multi", annee: 2023, description: "Chaos absurde en incarnant une chèvre dans un monde ouvert.", plateformes: ["ps5", "ps4", "pc", "xbox", "switch"] },
  { titre: "Surgeon Simulator 2", genre: "gestion", note: 68, prix: 24.99, mode: "Solo/Multi", annee: 2020, description: "Chirurgie loufoque et volontairement chaotique en coopération.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Rimworld Console Edition", genre: "gestion", note: 84, prix: 39.99, mode: "Solo", annee: 2022, description: "Gestion de colonie narrative, chaque partie raconte sa propre histoire.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Cattle Country", genre: "gestion", note: 76, prix: 24.99, mode: "Solo/Multi", annee: 2025, description: "Simulation de ranch et de vie rurale coopérative.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Kynseed", genre: "gestion", note: 74, prix: 24.99, mode: "Solo", annee: 2023, description: "Simulation de vie et de commerce dans un monde qui vieillit avec toi.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Tavern Talk", genre: "gestion", note: 76, prix: 19.99, mode: "Solo", annee: 2024, description: "Gère une taverne fantastique et écoute les histoires de tes clients.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Hunt: Showdown", genre: "action", note: 81, prix: 29.99, mode: "Multijoueur", annee: 2022, description: "Extraction shooter tendu dans un bayou hanté par des monstres.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "For Honor", genre: "combat", note: 79, prix: 19.99, mode: "Multijoueur", annee: 2020, description: "Duels de chevaliers, samouraïs et vikings dans une arène tactique.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "War Thunder", genre: "action", note: 79, prix: 0, mode: "Multijoueur", annee: 2020, description: "Simulation de véhicules militaires gratuite, du char à l'avion.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "World of Warships", genre: "action", note: 74, prix: 0, mode: "Multijoueur", annee: 2021, description: "Batailles navales gratuites entre cuirassés et porte-avions historiques.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Diablo Immortal", genre: "rpg", note: 68, prix: 0, mode: "Solo/Multi", annee: 2022, description: "Hack'n'slash gratuit situé entre Diablo II et III.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "The Finals", genre: "action", note: 82, prix: 0, mode: "Multijoueur", annee: 2023, description: "Tir en équipe gratuit à la destruction d'environnement spectaculaire.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Rust Console Edition", genre: "aventure", note: 71, prix: 39.99, mode: "Multijoueur", annee: 2021, description: "Survie impitoyable en ligne où la méfiance est reine.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "DayZ", genre: "horreur", note: 71, prix: 39.99, mode: "Multijoueur", annee: 2022, description: "Survie zombie hardcore en monde persistant ouvert.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Naraka: Bladepoint", genre: "combat", note: 76, prix: 0, mode: "Multijoueur", annee: 2022, description: "Battle royale mêlée avec grappin et arts martiaux spectaculaires.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Smite", genre: "combat", note: 77, prix: 0, mode: "Multijoueur", annee: 2020, description: "MOBA à la troisième personne mettant en scène des dieux mythologiques.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Paladins", genre: "action", note: 75, prix: 0, mode: "Multijoueur", annee: 2020, description: "Tir en équipe gratuit façon Overwatch avec cartes de talents.", plateformes: ["ps5", "ps4", "pc", "xbox", "switch"] },
  { titre: "Gwent: The Witcher Card Game", genre: "strategie", note: 79, prix: 0, mode: "Multijoueur", annee: 2020, description: "Jeu de cartes stratégique tiré de l'univers The Witcher.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Teamfight Tactics", genre: "strategie", note: 78, prix: 0, mode: "Multijoueur", annee: 2023, description: "Auto-battler stratégique gratuit avec des champions à positionner.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "PGA Tour 2K25", genre: "sport", note: 77, prix: 69.99, mode: "Multijoueur", annee: 2024, description: "Simulation de golf avec parcours officiels et carrière approfondie.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Synapse", genre: "action", note: 80, prix: 34.99, mode: "Solo", annee: 2023, description: "Tir en réalité virtuelle où l'esprit contrôle littéralement les tirs.", plateformes: ["ps5"] },
  { titre: "Firewall Zero Hour", genre: "action", note: 76, prix: 34.99, mode: "Multijoueur", annee: 2020, description: "Tir tactique compétitif en réalité virtuelle, 4 contre 4.", plateformes: ["ps5"] },
  { titre: "Job Simulator", genre: "gestion", note: 78, prix: 19.99, mode: "Solo", annee: 2023, description: "Simulation d'emplois absurdes et hilarants en réalité virtuelle.", plateformes: ["ps5", "pc"] },
  { titre: "The Walking Dead: Saints & Sinners", genre: "horreur", note: 84, prix: 39.99, mode: "Solo", annee: 2023, description: "Survie zombie immersive et physique en réalité virtuelle.", plateformes: ["ps5", "pc"] },
  { titre: "Swordsman VR", genre: "combat", note: 78, prix: 24.99, mode: "Solo/Multi", annee: 2023, description: "Combat à l'épée physique et exigeant en réalité virtuelle.", plateformes: ["ps5", "pc"] },
  { titre: "Pavlov VR", genre: "action", note: 82, prix: 24.99, mode: "Multijoueur", annee: 2023, description: "FPS tactique compétitif en réalité virtuelle façon Counter-Strike.", plateformes: ["ps5", "pc"] },
  { titre: "Kayak VR: Mirage", genre: "sport", note: 80, prix: 24.99, mode: "Solo/Multi", annee: 2023, description: "Kayak apaisant et immersif dans des environnements naturels somptueux.", plateformes: ["ps5", "pc"] },
  { titre: "Little Cities", genre: "gestion", note: 77, prix: 24.99, mode: "Solo", annee: 2023, description: "Urbanisme miniature relaxant en réalité virtuelle.", plateformes: ["ps5"] },
  // Nouveau lot : dépassement des 500 jeux
  { titre: "Marvel's Avengers", genre: "action", note: 66, prix: 19.99, mode: "Solo/Multi", annee: 2020, description: "Les super-héros Marvel s'unissent contre une organisation menaçante.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Kingdom Come: Deliverance", genre: "rpg", note: 76, prix: 29.99, mode: "Solo", annee: 2020, description: "RPG médiéval réaliste sans magie, en Bohême du XVe siècle.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Kingdom Come: Deliverance II", genre: "rpg", note: 87, prix: 59.99, mode: "Solo", annee: 2025, description: "Suite ambitieuse du RPG médiéval réaliste, plus vaste et plus riche.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Metro Exodus", genre: "action", note: 82, prix: 29.99, mode: "Solo", annee: 2020, description: "Fuite du métro moscovite à travers une Russie post-apocalyptique.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Metro 2033 Redux", genre: "action", note: 78, prix: 14.99, mode: "Solo", annee: 2020, description: "Survie oppressante dans le métro de Moscou après l'apocalypse.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Metro: Last Light Redux", genre: "action", note: 79, prix: 14.99, mode: "Solo", annee: 2020, description: "Suite tendue explorant les tunnels et la surface irradiée de Moscou.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Dead Island 2", genre: "action", note: 78, prix: 59.99, mode: "Solo/Multi", annee: 2023, description: "Zombies déjantés et gore dans un Los Angeles en pleine apocalypse.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Vampyr", genre: "rpg", note: 71, prix: 29.99, mode: "Solo", annee: 2020, description: "Médecin devenu vampire à Londres, tiraillé entre soigner et se nourrir.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Greedfall", genre: "rpg", note: 74, prix: 29.99, mode: "Solo", annee: 2020, description: "Diplomatie et exploration sur une île magique aux factions rivales.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Biomutant", genre: "rpg", note: 63, prix: 29.99, mode: "Solo", annee: 2021, description: "Action-RPG animalier post-apocalyptique à la personnalisation poussée.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "The Surge 2", genre: "action", note: 74, prix: 19.99, mode: "Solo", annee: 2020, description: "Souls-like industriel où l'on découpe des membres robotisés.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Code Vein", genre: "action", note: 70, prix: 29.99, mode: "Solo/Multi", annee: 2020, description: "Souls-like façon anime avec des vampires-revenants.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Yakuza 0", genre: "action", note: 87, prix: 19.99, mode: "Solo", annee: 2020, description: "Préquelle culte de la saga, entre bagarres de rue et business immobilier.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Yakuza Kiwami", genre: "action", note: 80, prix: 19.99, mode: "Solo", annee: 2020, description: "Remake du premier Yakuza, vengeance et loyauté dans le Tokyo criminel.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Yakuza Kiwami 2", genre: "action", note: 82, prix: 19.99, mode: "Solo", annee: 2020, description: "Suite remaniée entre guerre de clans et quête de rédemption.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Judgment", genre: "action", note: 82, prix: 29.99, mode: "Solo", annee: 2021, description: "Détective privé mène l'enquête dans le Tokyo nocturne de Kamurocho.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Lost Judgment", genre: "action", note: 84, prix: 39.99, mode: "Solo", annee: 2021, description: "Nouvelle enquête sombre mêlant harcèlement scolaire et corruption.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Ghostbusters: Spirits Unleashed", genre: "action", note: 66, prix: 29.99, mode: "Coopératif", annee: 2022, description: "Chasse aux fantômes asymétrique en coopération à quatre.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Evil Dead: The Game", genre: "horreur", note: 71, prix: 34.99, mode: "Multijoueur", annee: 2022, description: "Asymétrique horrifique inspiré de la saga culte Evil Dead.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Predator: Hunting Grounds", genre: "action", note: 60, prix: 19.99, mode: "Multijoueur", annee: 2020, description: "Traque asymétrique entre commandos et le redoutable Predator.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Injustice 2", genre: "combat", note: 87, prix: 19.99, mode: "Multijoueur", annee: 2020, description: "Super-héros DC s'affrontent dans un monde alternatif tyrannique.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Mortal Kombat 11", genre: "combat", note: 83, prix: 19.99, mode: "Multijoueur", annee: 2020, description: "Combats sanglants et Fatalities emblématiques de la saga.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Soulcalibur VI", genre: "combat", note: 82, prix: 29.99, mode: "Multijoueur", annee: 2020, description: "Combat à l'arme blanche technique et spectaculaire.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Granblue Fantasy Versus", genre: "combat", note: 76, prix: 39.99, mode: "Multijoueur", annee: 2020, description: "Combat 2D accessible tiré de l'univers Granblue Fantasy.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "The King of Fighters XIV", genre: "combat", note: 76, prix: 19.99, mode: "Multijoueur", annee: 2020, description: "Combat d'équipe de 3 avec un casting massif de personnages.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Skullgirls", genre: "combat", note: 81, prix: 14.99, mode: "Multijoueur", annee: 2020, description: "Combat 2D technique à l'animation dessinée à la main.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Nickelodeon All-Star Brawl 2", genre: "combat", note: 68, prix: 39.99, mode: "Multijoueur", annee: 2023, description: "Combat façon Smash avec les personnages cultes de Nickelodeon.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Trackmania", genre: "course", note: 78, prix: 24.99, mode: "Solo/Multi", annee: 2023, description: "Course arcade précise portée par des circuits créés par la communauté.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Wreckfest", genre: "course", note: 79, prix: 29.99, mode: "Solo/Multi", annee: 2020, description: "Courses de démolition brutales et jubilatoires.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Circuit Superstars", genre: "course", note: 76, prix: 24.99, mode: "Solo/Multi", annee: 2021, description: "Course arcade vue du dessus au feeling précis et exigeant.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Art of Rally", genre: "course", note: 82, prix: 19.99, mode: "Solo", annee: 2021, description: "Rallye minimaliste et stylisé aux sensations pures.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "MotoGP 23", genre: "course", note: 75, prix: 59.99, mode: "Solo/Multi", annee: 2023, description: "Simulation officielle de MotoGP avec carrière détaillée.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Ride 5", genre: "course", note: 74, prix: 59.99, mode: "Solo/Multi", annee: 2023, description: "Simulation moto avec un vaste catalogue de machines sous licence.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Session: Skate Sim", genre: "sport", note: 71, prix: 34.99, mode: "Solo", annee: 2022, description: "Skateboard exigeant au contrôle indépendant de chaque pied.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "OlliOlli World", genre: "sport", note: 84, prix: 29.99, mode: "Solo/Multi", annee: 2022, description: "Skate en 2.5D coloré et généreux en tricks et fluidité.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Bomb Rush Cyberfunk", genre: "action", note: 82, prix: 29.99, mode: "Solo", annee: 2023, description: "Skate et graffiti funk dans une ville cyberpunk stylisée.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Kentucky Route Zero", genre: "histoire", note: 87, prix: 24.99, mode: "Solo", annee: 2020, description: "Road trip onirique et magique à travers une Amérique surréaliste.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Return of the Obra Dinn", genre: "histoire", note: 87, prix: 19.99, mode: "Solo", annee: 2020, description: "Enquête en noir et blanc sur la disparition d'un équipage entier.", plateformes: ["ps5", "ps4", "pc", "xbox", "switch"] },
  { titre: "Outer Wilds", genre: "aventure", note: 91, prix: 24.99, mode: "Solo", annee: 2021, description: "Boucle temporelle spatiale et mystère cosmique fascinant.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "The Outer Worlds", genre: "rpg", note: 82, prix: 29.99, mode: "Solo", annee: 2020, description: "RPG spatial satirique sur le capitalisme débridé des colonies.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Subnautica", genre: "aventure", note: 87, prix: 29.99, mode: "Solo", annee: 2020, description: "Survie et exploration sous-marine sur une planète océanique alien.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Subnautica: Below Zero", genre: "aventure", note: 78, prix: 29.99, mode: "Solo", annee: 2021, description: "Suite glaciale de la survie sous-marine, plus verticale et narrative.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Raft", genre: "aventure", note: 78, prix: 19.99, mode: "Solo/Multi", annee: 2023, description: "Survie sur un radeau à la dérive au milieu de l'océan.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Astroneer", genre: "aventure", note: 80, prix: 29.99, mode: "Solo/Multi", annee: 2020, description: "Exploration et terraformation coopérative de planètes colorées.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "The Long Dark", genre: "aventure", note: 79, prix: 29.99, mode: "Solo", annee: 2020, description: "Survie réaliste et exigeante dans le grand nord canadien enneigé.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "This War of Mine", genre: "gestion", note: 84, prix: 19.99, mode: "Solo", annee: 2020, description: "Survie de civils pendant un siège, aussi dur moralement que matériellement.", plateformes: ["ps5", "ps4", "pc", "xbox", "switch"] },
  { titre: "Papers, Please", genre: "strategie", note: 85, prix: 9.99, mode: "Solo", annee: 2022, description: "Bureaucratie glaçante d'un douanier dans un état totalitaire fictif.", plateformes: ["ps5", "ps4", "pc", "xbox", "switch"] },
  { titre: "Return to Monkey Island", genre: "histoire", note: 87, prix: 24.99, mode: "Solo", annee: 2022, description: "Retour attendu de Guybrush Threepwood dans une aventure pointu-cliquer culte.", plateformes: ["ps5", "ps4", "pc", "xbox", "switch"] },
  { titre: "Planet of Lana", genre: "aventure", note: 80, prix: 24.99, mode: "Solo", annee: 2023, description: "Plateforme-puzzle envoûtant entre une fillette et une créature alliée.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Somerville", genre: "aventure", note: 73, prix: 24.99, mode: "Solo", annee: 2022, description: "Fuite familiale cinématique lors d'une invasion extraterrestre.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Eastward", genre: "aventure", note: 82, prix: 24.99, mode: "Solo", annee: 2021, description: "Road trip pixel art attachant dans un monde souterrain post-apo.", plateformes: ["ps5", "ps4", "pc", "xbox", "switch"] },
  { titre: "Tunic", genre: "action", note: 83, prix: 29.99, mode: "Solo", annee: 2022, description: "Petit renard explorateur dans un Zelda-like plein de secrets cryptiques.", plateformes: ["ps5", "ps4", "pc", "xbox", "switch"] },
  { titre: "Death's Door", genre: "action", note: 86, prix: 19.99, mode: "Solo", annee: 2021, description: "Corbeau faucheur d'âmes dans une aventure au charme mordant.", plateformes: ["ps5", "ps4", "pc", "xbox", "switch"] },
  { titre: "Carrion", genre: "horreur", note: 76, prix: 19.99, mode: "Solo", annee: 2021, description: "Incarne la créature dans un survival-horror inversé jouissif.", plateformes: ["ps5", "ps4", "pc", "xbox", "switch"] },
  { titre: "Inscryption", genre: "horreur", note: 87, prix: 19.99, mode: "Solo", annee: 2022, description: "Jeu de cartes horrifique méta aux mécaniques toujours surprenantes.", plateformes: ["ps5", "ps4", "pc", "xbox", "switch"] },
  { titre: "Rain World", genre: "action", note: 82, prix: 19.99, mode: "Solo", annee: 2020, description: "Survie exigeante d'une créature fragile dans un écosystème hostile.", plateformes: ["ps5", "ps4", "pc", "xbox", "switch"] },
  { titre: "Hyper Light Drifter", genre: "action", note: 85, prix: 19.99, mode: "Solo", annee: 2020, description: "Action pixel art au style rétro-futuriste envoûtant.", plateformes: ["ps5", "ps4", "pc", "xbox", "switch"] },
  { titre: "Gris", genre: "histoire", note: 85, prix: 16.99, mode: "Solo", annee: 2020, description: "Plateforme poétique sur le deuil, à l'aquarelle sublime.", plateformes: ["ps5", "ps4", "pc", "xbox", "switch"] },
  { titre: "Röki", genre: "histoire", note: 74, prix: 24.99, mode: "Solo", annee: 2021, description: "Conte scandinave d'énigmes au trait dessiné à la main.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "The Gardens Between", genre: "histoire", note: 79, prix: 14.99, mode: "Solo", annee: 2020, description: "Puzzle poétique sur le temps et l'amitié entre deux enfants.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Superliminal", genre: "histoire", note: 77, prix: 19.99, mode: "Solo", annee: 2020, description: "Puzzle en perspective où la taille des objets change tout.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "The Talos Principle", genre: "histoire", note: 85, prix: 19.99, mode: "Solo", annee: 2020, description: "Puzzle philosophique sur la conscience dans des ruines antiques.", plateformes: ["ps5", "ps4", "pc", "xbox", "switch"] },
  { titre: "The Talos Principle 2", genre: "histoire", note: 86, prix: 39.99, mode: "Solo", annee: 2023, description: "Suite ambitieuse questionnant l'avenir d'une civilisation de robots.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Wasteland 3", genre: "rpg", note: 81, prix: 39.99, mode: "Solo/Multi", annee: 2020, description: "RPG tactique post-apocalyptique dans un Colorado glacial.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Pillars of Eternity II: Deadfire", genre: "rpg", note: 87, prix: 39.99, mode: "Solo", annee: 2020, description: "CRPG maritime riche en choix, factions et exploration d'archipel.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Solasta: Crown of the Magister", genre: "rpg", note: 74, prix: 39.99, mode: "Solo", annee: 2022, description: "RPG tactique fidèle aux règles de Donjons & Dragons.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Dragon Age: Inquisition", genre: "rpg", note: 85, prix: 19.99, mode: "Solo", annee: 2020, description: "Fantasy épique où l'on referme des failles démoniaques envahissantes.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Dragon Age: The Veilguard", genre: "rpg", note: 82, prix: 69.99, mode: "Solo", annee: 2024, description: "Nouvelle aventure Dragon Age contre une menace ancienne dévastatrice.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Mass Effect Andromeda", genre: "rpg", note: 68, prix: 19.99, mode: "Solo", annee: 2020, description: "Exploration d'une nouvelle galaxie à la recherche d'un foyer habitable.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Chained Echoes", genre: "rpg", note: 87, prix: 24.99, mode: "Solo", annee: 2023, description: "JRPG rétro-inspiré généreux au scénario politique surprenant.", plateformes: ["ps5", "ps4", "pc", "xbox", "switch"] },
  { titre: "Eiyuden Chronicle: Hundred Heroes", genre: "rpg", note: 76, prix: 49.99, mode: "Solo", annee: 2024, description: "JRPG classique successeur spirituel de Suikoden, cent héros recrutables.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Wolfenstein: Youngblood", genre: "action", note: 66, prix: 19.99, mode: "Coopératif", annee: 2020, description: "Les filles de BJ Blazkowicz libèrent Paris en coopération.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Serious Sam 4", genre: "action", note: 68, prix: 39.99, mode: "Solo/Multi", annee: 2022, description: "Défouloir arcade contre des hordes massives d'ennemis.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Bulletstorm: Full Clip Edition", genre: "action", note: 74, prix: 19.99, mode: "Solo", annee: 2020, description: "FPS déjanté où les exécutions stylées rapportent des points.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Vanquish", genre: "action", note: 84, prix: 19.99, mode: "Solo", annee: 2020, description: "TPS ultra nerveux avec glissades propulsées par réacteurs.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Metal Gear Rising: Revengeance", genre: "action", note: 82, prix: 19.99, mode: "Solo", annee: 2020, description: "Action au katana ultra stylée où tout se découpe à volonté.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Gotham Knights", genre: "action", note: 66, prix: 39.99, mode: "Solo/Multi", annee: 2022, description: "La Batfamille protège Gotham après la mort de Batman.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Suicide Squad: Kill the Justice League", genre: "action", note: 56, prix: 39.99, mode: "Solo/Multi", annee: 2024, description: "L'Escouade Suicide affronte une Justice League corrompue.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Riders Republic", genre: "sport", note: 73, prix: 29.99, mode: "Multijoueur", annee: 2021, description: "Sports extrêmes massifs en monde ouvert entre vélo, ski et wingsuit.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Steep", genre: "sport", note: 72, prix: 19.99, mode: "Solo/Multi", annee: 2020, description: "Glisse en montagne libre entre ski, snowboard et parapente.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Golf With Your Friends", genre: "sport", note: 74, prix: 19.99, mode: "Multijoueur", annee: 2021, description: "Mini-golf déjanté et compétitif entre amis.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Just Dance 2024", genre: "sport", note: 68, prix: 49.99, mode: "Multijoueur", annee: 2023, description: "Danse rythmique familiale avec des tubes du moment.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Cricket 24", genre: "sport", note: 70, prix: 59.99, mode: "Multijoueur", annee: 2024, description: "Simulation officielle de cricket avec compétitions internationales.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Rugby 24", genre: "sport", note: 65, prix: 49.99, mode: "Multijoueur", annee: 2024, description: "Simulation de rugby avec équipes et compétitions officielles.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Fell Seal: Arbiter's Mark", genre: "strategie", note: 79, prix: 24.99, mode: "Solo", annee: 2020, description: "Tactique au tour par tour à l'héritage Final Fantasy Tactics.", plateformes: ["ps5", "ps4", "pc", "xbox", "switch"] },
  { titre: "Trials of Mana", genre: "rpg", note: 75, prix: 39.99, mode: "Solo", annee: 2020, description: "Remake d'un JRPG culte des années 90, action et magie élémentaire.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Marvel's Midnight Suns", genre: "strategie", note: 79, prix: 59.99, mode: "Solo", annee: 2022, description: "Tactique au tour par tour avec les héros Marvel façon jeu de cartes.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Sonic Frontiers", genre: "plateforme", note: 72, prix: 59.99, mode: "Solo", annee: 2022, description: "Sonic en monde ouvert, entre exploration et vitesse pure.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Sonic Superstars", genre: "plateforme", note: 75, prix: 59.99, mode: "Solo/Multi", annee: 2023, description: "Retour du Sonic 2D classique avec de nouveaux pouvoirs coopératifs.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Psychonauts 2", genre: "plateforme", note: 87, prix: 39.99, mode: "Solo", annee: 2021, description: "Plateforme mental et créatif dans les esprits de personnages loufoques.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "A Hat in Time", genre: "plateforme", note: 82, prix: 29.99, mode: "Solo/Multi", annee: 2021, description: "Plateforme 3D coloré et généreux façon Mario 64.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Yooka-Laylee", genre: "plateforme", note: 71, prix: 29.99, mode: "Solo", annee: 2020, description: "Successeur spirituel de Banjo-Kazooie en plateforme 3D collect-a-thon.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "New Super Lucky's Tale", genre: "plateforme", note: 71, prix: 29.99, mode: "Solo", annee: 2020, description: "Plateforme familial et coloré avec un renard attachant.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Martha Is Dead", genre: "horreur", note: 68, prix: 29.99, mode: "Solo", annee: 2022, description: "Drame psychologique glaçant en Toscane pendant la Seconde Guerre mondiale.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Song of Horror", genre: "horreur", note: 76, prix: 29.99, mode: "Solo", annee: 2020, description: "Survival-horror à l'ancienne où chaque mort change de personnage jouable.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Tormented Souls", genre: "horreur", note: 74, prix: 24.99, mode: "Solo", annee: 2021, description: "Hommage assumé au survival-horror classique façon Resident Evil.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "The Medium", genre: "horreur", note: 71, prix: 49.99, mode: "Solo", annee: 2021, description: "Enquête entre deux réalités simultanées, l'une réelle, l'autre spirituelle.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Scorn", genre: "horreur", note: 68, prix: 39.99, mode: "Solo", annee: 2023, description: "Horreur biomécanique cauchemardesque à l'esthétique gigérienne.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Wargroove 2", genre: "strategie", note: 78, prix: 19.99, mode: "Solo/Multi", annee: 2023, description: "Tactique au tour par tour coloré façon Advance Wars.", plateformes: ["ps5", "ps4", "pc", "xbox", "switch"] },
  { titre: "Warhammer 40,000: Chaos Gate - Daemonhunters", genre: "strategie", note: 79, prix: 39.99, mode: "Solo", annee: 2022, description: "Tactique au tour par tour contre une infestation démoniaque galactique.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Phoenix Point", genre: "strategie", note: 71, prix: 39.99, mode: "Solo", annee: 2021, description: "Tactique au tour par tour contre une menace mutante mondiale.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Bus Simulator 21", genre: "gestion", note: 68, prix: 39.99, mode: "Solo/Multi", annee: 2021, description: "Simulation de conduite de bus urbain méticuleuse.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Construction Simulator", genre: "gestion", note: 70, prix: 39.99, mode: "Solo/Multi", annee: 2022, description: "Simulation de chantier avec grues, pelleteuses et bulldozers.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Lawn Mowing Simulator", genre: "gestion", note: 70, prix: 29.99, mode: "Solo", annee: 2021, description: "Simulation étonnamment relaxante de tonte de pelouse professionnelle.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Car Mechanic Simulator", genre: "gestion", note: 72, prix: 29.99, mode: "Solo", annee: 2021, description: "Répare, restaure et revends des voitures dans ton propre garage.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Thief Simulator", genre: "gestion", note: 68, prix: 19.99, mode: "Solo", annee: 2021, description: "Simulation de cambriolage méthodique et discret.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "WRC Generations", genre: "course", note: 74, prix: 49.99, mode: "Solo/Multi", annee: 2022, description: "Simulation de rallye officielle avec véhicules historiques.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "MXGP 2021", genre: "course", note: 71, prix: 49.99, mode: "Solo/Multi", annee: 2021, description: "Simulation officielle de motocross avec pilotes du championnat.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Rivals of Aether II", genre: "combat", note: 78, prix: 24.99, mode: "Multijoueur", annee: 2024, description: "Combat de plateforme compétitif façon Smash, exigeant et technique.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Them's Fightin' Herds", genre: "combat", note: 76, prix: 19.99, mode: "Multijoueur", annee: 2021, description: "Combat 2D technique avec des animaux de ferme adorables.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Zenless Zone Zero", genre: "action", note: 76, prix: 0, mode: "Solo", annee: 2024, description: "Action urbaine gratuite au style manga, combats rythmés et flashy.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Wuthering Waves", genre: "action", note: 74, prix: 0, mode: "Solo", annee: 2025, description: "Action-RPG gratuit en monde ouvert post-apocalyptique stylisé.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Hell Let Loose", genre: "action", note: 78, prix: 39.99, mode: "Multijoueur", annee: 2022, description: "FPS de la Seconde Guerre mondiale à l'échelle réaliste, 50 contre 50.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Insurgency: Sandstorm", genre: "action", note: 78, prix: 29.99, mode: "Multijoueur", annee: 2021, description: "FPS tactique et punitif basé sur des conflits contemporains.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Warhammer 40,000: Darktide", genre: "action", note: 72, prix: 39.99, mode: "Coopératif", annee: 2023, description: "Coop horde brutale dans les bas-fonds infestés d'une cité-ruche.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Warhammer: Vermintide 2", genre: "action", note: 79, prix: 29.99, mode: "Coopératif", annee: 2020, description: "Coop horde médiéval-fantastique contre des hordes de rats-guerriers.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Killing Floor 2", genre: "action", note: 79, prix: 29.99, mode: "Coopératif", annee: 2020, description: "Coop horde gore contre des zombies mutants toujours plus nombreux.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Back 4 Blood", genre: "action", note: 71, prix: 29.99, mode: "Coopératif", annee: 2021, description: "Coop zombie nerveuse par les créateurs de Left 4 Dead.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "World War Z", genre: "action", note: 68, prix: 29.99, mode: "Coopératif", annee: 2020, description: "Coop contre des hordes massives de zombies façon film éponyme.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Aliens: Fireteam Elite", genre: "action", note: 68, prix: 39.99, mode: "Coopératif", annee: 2021, description: "Coop tactique de marines contre des nuées de Xénomorphes.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Payday 3", genre: "action", note: 62, prix: 39.99, mode: "Coopératif", annee: 2023, description: "Braquages coopératifs stylés dans un New York contemporain.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Sniper Ghost Warrior Contracts 2", genre: "action", note: 68, prix: 39.99, mode: "Solo", annee: 2021, description: "Tir de précision tactique en environnements ouverts hostiles.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Tom Clancy's Ghost Recon Breakpoint", genre: "action", note: 61, prix: 19.99, mode: "Solo/Multi", annee: 2020, description: "Survie tactique sur une île hostile contrôlée par des drones ennemis.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Zombie Army 4: Dead War", genre: "horreur", note: 73, prix: 39.99, mode: "Coopératif", annee: 2020, description: "Coop horde contre des zombies nazis dans une Europe occulte.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Risk of Rain 2", genre: "action", note: 85, prix: 24.99, mode: "Solo/Multi", annee: 2020, description: "Rogue-like 3D nerveux où les objets s'accumulent à l'infini.", plateformes: ["ps5", "ps4", "pc", "xbox", "switch"] },
  { titre: "Roboquest", genre: "action", note: 82, prix: 24.99, mode: "Solo/Multi", annee: 2024, description: "FPS rogue-lite véloce et généreux en power-ups délirants.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Ravenswatch", genre: "action", note: 76, prix: 19.99, mode: "Solo/Multi", annee: 2024, description: "Rogue-lite mêlant contes de fées réinventés en héros d'action.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  // Nouveau lot : exclusivités et incontournables Nintendo Switch
  { titre: "The Legend of Zelda: Tears of the Kingdom", genre: "aventure", note: 96, prix: 69.99, mode: "Solo", annee: 2023, description: "Suite monumentale de Breath of the Wild avec construction et exploration verticale.", plateformes: ["switch"] },
  { titre: "The Legend of Zelda: Breath of the Wild", genre: "aventure", note: 97, prix: 59.99, mode: "Solo", annee: 2020, description: "Monde ouvert révolutionnaire qui a redéfini l'exploration en jeu vidéo.", plateformes: ["switch"] },
  { titre: "Super Mario Odyssey", genre: "plateforme", note: 97, prix: 59.99, mode: "Solo/Multi", annee: 2020, description: "Mario traverse des royaumes variés à l'aide de sa casquette possédante Cappy.", plateformes: ["switch"] },
  { titre: "Super Mario Bros. Wonder", genre: "plateforme", note: 92, prix: 59.99, mode: "Solo/Multi", annee: 2023, description: "Plateforme 2D coloré et surprenant avec des transformations loufoques." , plateformes: ["switch"] },
  { titre: "Super Mario Party Jamboree", genre: "sport", note: 79, prix: 59.99, mode: "Multijoueur", annee: 2024, description: "Plateau de mini-jeux familiaux et compétitifs à plusieurs." , plateformes: ["switch"] },
  { titre: "Mario Kart 8 Deluxe", genre: "course", note: 92, prix: 59.99, mode: "Solo/Multi", annee: 2020, description: "Le kart-racing le plus vendu de l'histoire, généreux et accessible." , plateformes: ["switch"] },
  { titre: "Super Smash Bros. Ultimate", genre: "combat", note: 93, prix: 59.99, mode: "Multijoueur", annee: 2020, description: "Le plus grand crossover de combat, avec un roster de légende." , plateformes: ["switch"] },
  { titre: "Animal Crossing: New Horizons", genre: "gestion", note: 90, prix: 59.99, mode: "Solo/Multi", annee: 2020, description: "Simulation de vie apaisante sur une île déserte à personnaliser." , plateformes: ["switch"] },
  { titre: "Splatoon 3", genre: "action", note: 83, prix: 59.99, mode: "Multijoueur", annee: 2022, description: "Tir à l'encre coloré et stylé en équipes, très compétitif." , plateformes: ["switch"] },
  { titre: "Pokémon Scarlet and Violet", genre: "rpg", note: 72, prix: 59.99, mode: "Solo/Multi", annee: 2022, description: "Premier monde ouvert de la saga Pokémon, exploration libre." , plateformes: ["switch"] },
  { titre: "Pokémon Legends: Arceus", genre: "rpg", note: 82, prix: 59.99, mode: "Solo", annee: 2022, description: "Réinvention audacieuse de la formule Pokémon en semi-monde ouvert." , plateformes: ["switch"] },
  { titre: "Metroid Prime Remastered", genre: "action", note: 91, prix: 39.99, mode: "Solo", annee: 2023, description: "Remaster somptueux du classique d'exploration spatiale en vue subjective." , plateformes: ["switch"] },
  { titre: "Metroid Dread", genre: "action", note: 88, prix: 59.99, mode: "Solo", annee: 2021, description: "Retour en 2D de Samus Aran, traque tendue par un robot mécanique." , plateformes: ["switch"] },
  { titre: "Kirby and the Forgotten Land", genre: "plateforme", note: 87, prix: 59.99, mode: "Solo/Multi", annee: 2022, description: "Premier Kirby en 3D, mignon et étonnamment généreux en contenu." , plateformes: ["switch"] },
  { titre: "Fire Emblem Engage", genre: "strategie", note: 79, prix: 59.99, mode: "Solo", annee: 2023, description: "Tactique au tour par tour avec des héros légendaires de la saga invocables." , plateformes: ["switch"] },
  { titre: "Xenoblade Chronicles 3", genre: "rpg", note: 89, prix: 59.99, mode: "Solo", annee: 2022, description: "JRPG monumental en monde ouvert avec un système de combat riche." , plateformes: ["switch"] },
  { titre: "Pikmin 4", genre: "strategie", note: 87, prix: 59.99, mode: "Solo", annee: 2023, description: "Gestion d'une armée de créatures végétales pour explorer et survivre." , plateformes: ["switch"] },
  { titre: "Luigi's Mansion 3", genre: "aventure", note: 86, prix: 59.99, mode: "Solo/Multi", annee: 2020, description: "Luigi chasse les fantômes dans un hôtel hanté plein de puzzles." , plateformes: ["switch"] },
  { titre: "Bayonetta 3", genre: "action", note: 87, prix: 59.99, mode: "Solo", annee: 2022, description: "Action stylée et démesurée avec une sorcière aux pouvoirs titanesques." , plateformes: ["switch"] },
  { titre: "Advance Wars 1+2: Re-Boot Camp", genre: "strategie", note: 74, prix: 59.99, mode: "Solo/Multi", annee: 2023, description: "Remake coloré de la stratégie militaire au tour par tour culte." , plateformes: ["switch"] },
  { titre: "Ring Fit Adventure", genre: "sport", note: 83, prix: 79.99, mode: "Solo", annee: 2020, description: "Fitness ludique où chaque exercice fait progresser une aventure RPG." , plateformes: ["switch"] },
  { titre: "Mario + Rabbids Sparks of Hope", genre: "strategie", note: 79, prix: 59.99, mode: "Solo", annee: 2022, description: "Tactique au tour par tour surprenant mêlant Mario et les Lapins Crétins." , plateformes: ["switch"] },
  { titre: "Paper Mario: The Thousand-Year Door", genre: "rpg", note: 87, prix: 59.99, mode: "Solo", annee: 2024, description: "Remake du RPG culte à l'humour et à l'écriture toujours aussi savoureux." , plateformes: ["switch"] },
  { titre: "Donkey Kong Country: Tropical Freeze", genre: "plateforme", note: 89, prix: 59.99, mode: "Solo/Multi", annee: 2020, description: "Plateforme exigeant et magnifique à travers des îles tropicales." , plateformes: ["switch"] },
  { titre: "Kirby's Return to Dream Land Deluxe", genre: "plateforme", note: 85, prix: 59.99, mode: "Solo/Multi", annee: 2023, description: "Plateforme coopératif doux et généreux avec Kirby et ses amis." , plateformes: ["switch"] },
  { titre: "Xenoblade Chronicles 2", genre: "rpg", note: 83, prix: 59.99, mode: "Solo", annee: 2020, description: "JRPG épique avec des Lames invocables et un vaste monde à explorer." , plateformes: ["switch"] },
  { titre: "Triangle Strategy", genre: "strategie", note: 81, prix: 59.99, mode: "Solo", annee: 2022, description: "Tactique au tour par tour aux embranchements narratifs marqués." , plateformes: ["switch"] },
  { titre: "Astral Chain", genre: "action", note: 84, prix: 59.99, mode: "Solo", annee: 2020, description: "Action policière futuriste où l'on combat aux côtés d'une entité liée." , plateformes: ["switch"] },
  { titre: "Fire Emblem: Three Houses", genre: "strategie", note: 89, prix: 59.99, mode: "Solo", annee: 2020, description: "Tactique et vie scolaire mêlées dans une fresque politique riche." , plateformes: ["switch"] },
  { titre: "Xenoblade Chronicles: Definitive Edition", genre: "rpg", note: 88, prix: 59.99, mode: "Solo", annee: 2020, description: "Remaster du JRPG culte se déroulant sur le dos de titans figés." , plateformes: ["switch"] },
  { titre: "Super Mario 3D World + Bowser's Fury", genre: "plateforme", note: 89, prix: 59.99, mode: "Solo/Multi", annee: 2021, description: "Plateforme 3D coopératif avec un monde ouvert bonus surprenant." , plateformes: ["switch"] },
  { titre: "Luigi's Mansion 2 HD", genre: "aventure", note: 82, prix: 49.99, mode: "Solo/Multi", annee: 2024, description: "Remaster de la chasse aux fantômes en missions sur plusieurs manoirs." , plateformes: ["switch"] },
  { titre: "Pikmin 3 Deluxe", genre: "strategie", note: 84, prix: 59.99, mode: "Solo/Multi", annee: 2020, description: "Gestion de créatures végétales pour résoudre une crise alimentaire." , plateformes: ["switch"] },
  { titre: "Kirby Star Allies", genre: "plateforme", note: 78, prix: 59.99, mode: "Solo/Multi", annee: 2020, description: "Kirby recrute des alliés aux pouvoirs combinables en plateforme coopératif." , plateformes: ["switch"] },
  { titre: "Splatoon 2", genre: "action", note: 80, prix: 59.99, mode: "Multijoueur", annee: 2020, description: "Tir à l'encre coloré, premier volet consolidé de la licence." , plateformes: ["switch"] },
  { titre: "Mario Golf: Super Rush", genre: "sport", note: 74, prix: 59.99, mode: "Solo/Multi", annee: 2021, description: "Golf déjanté avec les personnages Mario et un mode aventure." , plateformes: ["switch"] },
  { titre: "Mario Tennis Aces", genre: "sport", note: 76, prix: 59.99, mode: "Solo/Multi", annee: 2020, description: "Tennis arcade avec coups spéciaux et un mode histoire." , plateformes: ["switch"] },
  { titre: "New Pokémon Snap", genre: "aventure", note: 79, prix: 59.99, mode: "Solo", annee: 2021, description: "Safari photo relaxant à travers des habitats peuplés de Pokémon." , plateformes: ["switch"] },
  { titre: "Pokémon Sword and Shield", genre: "rpg", note: 80, prix: 59.99, mode: "Solo/Multi", annee: 2020, description: "Aventure Pokémon classique dans la région inspirée du Royaume-Uni." , plateformes: ["switch"] },
  { titre: "Detective Pikachu Returns", genre: "histoire", note: 74, prix: 59.99, mode: "Solo", annee: 2023, description: "Enquête attachante aux côtés d'un Pikachu doué de parole." , plateformes: ["switch"] },
  { titre: "Big Brain Academy: Brain vs Brain", genre: "strategie", note: 73, prix: 39.99, mode: "Solo/Multi", annee: 2021, description: "Mini-jeux cérébraux compétitifs et familiaux." , plateformes: ["switch"] },
  { titre: "Clubhouse Games: 51 Worldwide Classics", genre: "strategie", note: 79, prix: 39.99, mode: "Solo/Multi", annee: 2020, description: "Compilation de 51 jeux de société et de cartes classiques." , plateformes: ["switch"] },
  { titre: "WarioWare: Move It!", genre: "action", note: 79, prix: 49.99, mode: "Solo/Multi", annee: 2023, description: "Micro-jeux frénétiques à base de mouvements loufoques des Joy-Con." , plateformes: ["switch"] },
  { titre: "Super Kirby Clash", genre: "action", note: 74, prix: 0, mode: "Solo/Multi", annee: 2020, description: "Combats de boss coopératifs gratuits façon RPG dans l'univers Kirby." , plateformes: ["switch"] },
  { titre: "Tetris 99", genre: "strategie", note: 82, prix: 0, mode: "Multijoueur", annee: 2020, description: "Battle royale gratuit de Tetris à 99 joueurs simultanés." , plateformes: ["switch"] },
  { titre: "Live A Live", genre: "rpg", note: 84, prix: 59.99, mode: "Solo", annee: 2022, description: "Remake HD-2D d'un JRPG culte aux huit époques et héros distincts." , plateformes: ["switch"] },
  { titre: "Octopath Traveler", genre: "rpg", note: 83, prix: 59.99, mode: "Solo", annee: 2020, description: "Huit voyageurs, huit histoires en HD-2D, précurseur du style." , plateformes: ["switch", "pc", "ps5"] },
  { titre: "Bravely Default II", genre: "rpg", note: 78, prix: 59.99, mode: "Solo", annee: 2021, description: "JRPG classique aux jobs modulables et à la difficulté exigeante." , plateformes: ["switch"] },
  { titre: "Shin Megami Tensei V", genre: "rpg", note: 84, prix: 59.99, mode: "Solo", annee: 2021, description: "RPG sombre où l'on négocie et fusionne des démons en Tokyo post-apo." , plateformes: ["switch"] },
  { titre: "Triangle Strategy: Definitive", genre: "strategie", note: 81, prix: 59.99, mode: "Solo", annee: 2022, description: "Tactique politique aux choix moraux déterminant plusieurs fins." , plateformes: ["switch"] },
  { titre: "Yoshi's Crafted World", genre: "plateforme", note: 79, prix: 59.99, mode: "Solo/Multi", annee: 2020, description: "Plateforme adorable à l'esthétique de diorama artisanal." , plateformes: ["switch"] },
  { titre: "Cadence of Hyrule", genre: "action", note: 84, prix: 24.99, mode: "Solo/Multi", annee: 2020, description: "Rogue-like rythmique dans l'univers Zelda, chaque pas est en musique." , plateformes: ["switch"] },
  { titre: "Zelda: Link's Awakening", genre: "aventure", note: 87, prix: 59.99, mode: "Solo", annee: 2020, description: "Remake au style diorama d'un classique Zelda sur une île mystérieuse." , plateformes: ["switch"] },
  { titre: "Xenoblade Chronicles X: Definitive Edition", genre: "rpg", note: 85, prix: 59.99, mode: "Solo", annee: 2025, description: "Exploration d'une planète alien massive avec mechs pilotables." , plateformes: ["switch"] },
  { titre: "Endless Ocean Luminous", genre: "aventure", note: 74, prix: 49.99, mode: "Solo/Multi", annee: 2024, description: "Exploration sous-marine relaxante à la découverte d'espèces marines." , plateformes: ["switch"] },
  { titre: "Princess Peach: Showtime!", genre: "plateforme", note: 76, prix: 59.99, mode: "Solo", annee: 2024, description: "Peach se transforme pour résoudre des énigmes sur une scène de théâtre." , plateformes: ["switch"] },
  { titre: "Mario vs. Donkey Kong", genre: "plateforme", note: 77, prix: 49.99, mode: "Solo/Multi", annee: 2024, description: "Remake de puzzle-plateforme où Mario récupère des jouets volés." , plateformes: ["switch"] },
  { titre: "Super Mario RPG", genre: "rpg", note: 85, prix: 59.99, mode: "Solo", annee: 2023, description: "Remake du RPG culte mêlant Mario et système de combat à réaction." , plateformes: ["switch"] },
  // Éditions premium (jusqu'à 120€) et jeux gratuits multi-plateformes
  { titre: "Diablo IV: Ultimate Edition", genre: "rpg", note: 86, prix: 109.99, mode: "Solo/Multi", annee: 2023, description: "Édition complète avec pass de combat, montures et contenu bonus.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Assassin's Creed Shadows Ultimate Edition", genre: "aventure", note: 78, prix: 119.99, mode: "Solo", annee: 2025, description: "Édition ultime avec saison additionnelle dans le Japon féodal.", plateformes: ["ps5", "pc", "xbox"] },
  { titre: "Elden Ring: Shadow of the Erdtree Deluxe", genre: "rpg", note: 95, prix: 89.99, mode: "Solo/Multi", annee: 2024, description: "Jeu de base et extension Shadow of the Erdtree réunis.", plateformes: ["ps5", "ps4", "pc", "xbox"] },
  { titre: "Final Fantasy VII Rebirth Deluxe Edition", genre: "rpg", note: 92, prix: 99.99, mode: "Solo", annee: 2024, description: "Édition deluxe avec artbook numérique et contenus cosmétiques bonus.", plateformes: ["ps5"] },
  { titre: "Monster Hunter Wilds Premium Edition", genre: "action", note: 85, prix: 99.99, mode: "Solo/Multi", annee: 2025, description: "Édition premium avec pack de bienvenue et objets cosmétiques exclusifs.", plateformes: ["ps5", "pc", "xbox"] },
  { titre: "Halo Infinite", genre: "action", note: 79, prix: 0, mode: "Multijoueur", annee: 2021, description: "Multijoueur gratuit du Spartan Master Chief, arène et Battle Royale-like.", plateformes: ["xbox", "pc"] },
  { titre: "Pokémon UNITE", genre: "combat", note: 74, prix: 0, mode: "Multijoueur", annee: 2021, description: "MOBA gratuit en équipes avec des Pokémon emblématiques." , plateformes: ["switch"] },
  { titre: "Gears Tactics", genre: "strategie", note: 81, prix: 39.99, mode: "Solo", annee: 2020, description: "Tactique au tour par tour brutal dans l'univers Gears of War.", plateformes: ["xbox", "pc"] },
  { titre: "Sunset Overdrive", genre: "action", note: 80, prix: 29.99, mode: "Solo", annee: 2020, description: "Action déjantée en monde ouvert contre des mutants gazeux colorés.", plateformes: ["xbox", "pc"] },
  { titre: "Asphalt 9: Legends", genre: "course", note: 74, prix: 0, mode: "Multijoueur", annee: 2020, description: "Course arcade gratuite avec des voitures de luxe et cascades spectaculaires.", plateformes: ["switch", "pc"] },
];

const GENRE_KEYS = ["", "action", "aventure", "rpg", "histoire", "gestion", "strategie", "horreur", "sport", "course", "plateforme", "combat"];
const MODE_KEYS = ["", "solo", "multi", "coop"];
const PLATEFORME_KEYS = ["ps5", "ps4", "xbox", "pc", "switch"];
const PLATEFORME_SHORT = { ps5: "PS5", ps4: "PS4", xbox: "XBOX", pc: "PC", switch: "SWITCH" };
const PLATEFORME_COLORS = {
  ps5: "#2E7BE8",
  ps4: "#4A9BE0",
  xbox: "#5FBE4B",
  pc: "#B0B4C4",
  switch: "#E62E45",
};
const SORT_KEYS = ["note", "prix_asc", "prix_desc", "recent"];
const TILE_DEFS = [
  { key: "rpg", icon: Sparkles, color: "#A78BFA", preset: { genre: "rpg" } },
  { key: "action", icon: Swords, color: "#FF6B6B", preset: { genre: "action" } },
  { key: "aventure", icon: Compass, color: "#4ECDC4", preset: { genre: "aventure" } },
  { key: "horreur", icon: Skull, color: "#EB5757", preset: { genre: "horreur" } },
  { key: "course", icon: Car, color: "#F2994A", preset: { genre: "course" } },
  { key: "combat", icon: Swords, color: "#EF5DA8", preset: { genre: "combat" } },
  { key: "gestion", icon: Settings2, color: "#6FCF97", preset: { genre: "gestion" } },
  { key: "strategie", icon: Landmark, color: "#56CCF2", preset: { genre: "strategie" } },
  { key: "solo", icon: User, color: "var(--muted)", preset: { mode: "solo" } },
  { key: "multi", icon: Users, color: "var(--accent)", preset: { mode: "multi" } },
  { key: "coop", icon: PersonStanding, color: "#59D18C", preset: { mode: "coop" } },
  { key: "vr", icon: Glasses, color: "#7B5CFA", preset: { keyword: "réalité virtuelle" } },
  { key: "gratuit", icon: Gift, color: "#59D18C", preset: { freeOnly: true } },
  { key: "psplus", icon: Crown, color: "#00B9F1", preset: { psPlusOnly: true } },
  { key: "gamepass", icon: Gamepad2, color: "#5FBE4B", preset: { gamePassOnly: true } },
];

const LANGUAGES = [
  { code: "fr", flag: "🇫🇷", label: "Français" },
  { code: "en", flag: "🇬🇧", label: "English" },
  { code: "es", flag: "🇪🇸", label: "Español" },
  { code: "ja", flag: "🇯🇵", label: "日本語" },
  { code: "it", flag: "🇮🇹", label: "Italiano" },
];

const DESC_EN = {
"God of War Ragnarök": "Kratos and Atreus face Ragnarök in a moving Norse epic.",
"Marvel's Spider-Man 2": "Peter and Miles join forces against Venom in New York.",
"Horizon Forbidden West": "Aloy explores a post-apocalyptic world of animal-like machines.",
"Baldur's Gate 3": "Deep tactical RPG based on Dungeons & Dragons, rich in narrative choices.",
"Final Fantasy VII Rebirth": "Sequel to the acclaimed remake, blending dynamic combat and epic adventure.",
"Persona 5 Royal": "High schoolers become phantom thieves in a stylish Tokyo.",
"Disco Elysium": "Dreamlike detective investigation carried by exceptional writing.",
"Detroit: Become Human": "Three androids live intertwined destinies with branching choices.",
"Life is Strange: True Colors": "Alex feels others' emotions to uncover a family secret.",
"Stray": "A cat wanders a robot-filled cybernetic city.",
"Cities: Skylines II": "Build and manage a complex metropolis and its infrastructure.",
"Tropico 6": "Rule a Caribbean island between dictatorship and diplomacy.",
"Two Point Hospital": "Run a wacky hospital and treat implausible illnesses.",
"Frostpunk": "Icy survival where every management decision has a moral cost.",
"Football Manager 2024": "Take charge of a football club all the way to the top.",
"Elden Ring": "Vast, unforgiving open world by FromSoftware and George R.R. Martin.",
"Ghost of Tsushima": "A samurai defends his island against the Mongol invasion.",
"The Last of Us Part II": "Dark, intense sequel about vengeance and its consequences.",
"It Takes Two": "A miniaturized couple must cooperate to save their marriage.",
"A Way Out": "Two escaped convicts must cooperate from start to finish.",
"Overcooked! All You Can Eat": "Chaotic, cooperative cooking against the clock.",
"EA Sports FC 24": "Football simulation with official licenses and online modes.",
"Gran Turismo 7": "Demanding racing simulation with a vast vehicle garage.",
"Resident Evil 4 Remake": "Overhaul of the horror-action classic starring Leon Kennedy.",
"Alan Wake 2": "Psychological thriller blending fiction and unsettling reality.",
"Hogwarts Legacy": "Live the life of a wizard at Hogwarts in the 19th century.",
"Street Fighter 6": "Fast, competitive fights with a varied roster.",
"Tekken 8": "The Mishima family tournament returns with a reworked offense system.",
"Astro's Playroom": "Free platformer adventure celebrating PlayStation history.",
"Ratchet & Clank: Rift Apart": "Cross-dimensional journey packed with wild weapons and humor.",
"Sifu": "Demanding kung-fu game where every death ages the hero.",
"Death Stranding 2: On the Beach": "Sam Porter Bridges crosses a fractured world to reconnect survivors.",
"Silent Hill 2 Remake": "Overhaul of the cult psychological horror classic.",
"Helldivers 2": "Chaotic co-op against alien hordes for Super Earth.",
"Frostpunk 2": "City management on a glacial scale, now with societal politics.",
"Fortnite": "Iconic battle royale with building and regular events.",
"Call of Duty: Warzone": "Frantic battle royale set in the Call of Duty universe.",
"Apex Legends": "Heroic three-player squad battle royale, fast-paced and tactical.",
"Genshin Impact": "Fantasy open world with elemental exploration and gacha mechanics.",
"Fall Guys": "Colorful obstacle-course battle royale, full of goofy fun.",
"Rocket League": "Football played with turbo-charged cars, highly competitive.",
"Destiny 2": "Space looter-shooter with raids and narrative campaigns.",
"PUBG: Battlegrounds": "The pioneering battle royale, tactical and realistic.",
"Warframe": "Free space-ninja looter-shooter with massive amounts of content.",
"Path of Exile": "Demanding hack'n'slash with a dizzying skill tree.",
"Brawlhalla": "Smash-style platform fighter, simple and accessible.",
"Overwatch 2": "Team-based shooter built around heroes with varied abilities.",
"Splitgate": "Arena FPS with Portal-style portals, fast and technical.",
"MultiVersus": "Smash-style crossover fighting game with Warner characters.",
"Roblox": "Community-made mini-game platform, endlessly varied.",
"eFootball": "Konami's free football simulation.",
"The Sims 4": "Life and household management sim, now free to play.",
"Dauntless": "Free cooperative monster hunting in the Monster Hunter vein.",
"Honkai: Star Rail": "Turn-based tactical RPG set in a gacha-driven space universe.",
"Cyberpunk 2077": "Cyberpunk dystopia in Night City, rich in choice and action.",
"The Witcher 3: Wild Hunt": "Geralt of Rivia hunts monsters and intrigue in a dense open world.",
"Red Dead Redemption 2": "Western epic on the decline of an outlaw and his gang.",
"Grand Theft Auto V": "Three criminals in Los Santos in a legendary open world.",
"Sekiro: Shadows Die Twice": "Demanding samurai duels from FromSoftware.",
"Bloodborne": "Unforgiving gothic nightmare in the city of Yharnam.",
"Demon's Souls": "Lavish remake of FromSoftware's foundational souls-like.",
"Returnal": "Time loop on a hostile planet in an intense rogue-like.",
"Deathloop": "An assassin trapped in a time loop he must break in a single day.",
"Kena: Bridge of Spirits": "A spirit guide roams an enchanted forest, blending calm and combat.",
"Days Gone": "Motorcycle survival in a world overrun by zombie hordes.",
"Uncharted: Legacy of Thieves Collection": "Nathan Drake sets off on a legendary treasure hunt.",
"The Last of Us Part I": "Joel and Ellie cross a heartbreaking post-pandemic America.",
"Until Dawn": "Interactive horror slasher where every choice matters.",
"Firewatch": "An isolated fire lookout forms a mysterious radio bond.",
"What Remains of Edith Finch": "Short, poetic stories about the members of a cursed family.",
"Journey": "Contemplative desert crossing toward a glowing mountain.",
"Slay the Spire": "Addictive, strategic deck-building roguelike.",
"Civilization VI": "Build an empire across the ages, from antiquity to the space era.",
"Farming Simulator 22": "Run a modern farm from sowing to harvest.",
"Planet Coaster: Console Edition": "Build and manage a creative, detailed theme park.",
"Cities: Skylines": "Fine-grained city planning, from road networks to public services.",
"Stardew Valley": "Take over an abandoned farm and bring its valley back to life.",
"Two Point Campus": "Run a wacky university campus and its improbable courses.",
"Diablo IV": "Dark hack'n'slash set in a bloody, gothic world.",
"Dragon's Dogma 2": "Open world with summonable Pawns and a unique grip system.",
"Monster Hunter World": "Hunt colossal monsters cooperatively in a living ecosystem.",
"Monster Hunter Rise": "Dynamic hunts with the Wirebug for vertical mobility.",
"NBA 2K24": "Full basketball simulation with career and online modes.",
"F1 24": "Official Formula 1 simulation with an in-depth career mode.",
"Need for Speed Unbound": "Stylish street racing with a comic-book visual style.",
"Mortal Kombat 1": "Brutal fights and Fatalities in a reinvented timeline.",
"Guilty Gear Strive": "Demanding 2D fighter with a flamboyant art direction.",
"Dead Space Remake": "Terrifying overhaul of the cult sci-fi survival horror classic.",
"Amnesia: The Bunker": "Claustrophobic horror survival in a WWI bunker.",
"Outlast Trials": "Cooperative horror where fleeing beats fighting.",
"Little Nightmares II": "Macabre, dreamlike tale in an unsettling platformer.",
"Hollow Knight": "Mesmerizing metroidvania in a fallen insect kingdom.",
"Crash Bandicoot 4": "Demanding, colorful return of PlayStation's fastest marsupial.",
"Sackboy: A Big Adventure": "Family-friendly, creative platformer, solo or co-op.",
"LEGO Star Wars: The Skywalker Saga": "All nine Star Wars films reimagined in LEGO, humor guaranteed.",
"Sea of Thieves": "Cooperative open-world piracy, between treasure and boarding.",
"No Man's Sky": "Infinite procedural space exploration, hugely expanded since launch.",
"FIFA 21": "Football simulation, first edition on PS5.",
"FIFA 22": "Football with HyperMotion technology captured from real matches.",
"FIFA 23": "Last edition under the FIFA name, with women's football in Ultimate Team.",
"EA Sports FC 25": "Next-gen football with the 5-a-side Rush mode.",
"NBA 2K21": "Basketball simulation with career mode and the Neighborhood.",
"NBA 2K22": "Basketball with a reworked motion engine.",
"NBA 2K23": "Basketball simulation spotlighting the MyCareer mode.",
"NBA 2K25": "Basketball with a new ProPLAY physics engine.",
"Madden NFL 21": "American football, the franchise's PS5 debut.",
"Madden NFL 22": "NFL simulation with an improved Franchise mode.",
"Madden NFL 23": "American football with the FieldSENSE physics engine.",
"Madden NFL 25": "NFL simulation with reworked defensive AI.",
"WWE 2K22": "Wrestling simulation with MyGM mode and reworked gameplay.",
"WWE 2K23": "Wrestling with WarGames mode and an expanded superstar roster.",
"WWE 2K25": "Wrestling simulation with a new intergender mode.",
"NHL 24": "Ice hockey simulation with reworked collision physics.",
"MLB The Show 24": "Baseball simulation renowned for its realism and career mode.",
"PGA Tour 2K23": "Golf simulation with officially licensed courses.",
"UFC 5": "MMA simulation with an advanced damage and fatigue system.",
"F1 23": "Official Formula 1 with the narrative Braking Point mode.",
"F1 25": "The latest official Formula 1 simulation.",
"WRC 23": "Official rally simulation with highly demanding stages.",
"Tony Hawk's Pro Skater 1+2": "Cult remake of arcade skating, frantic and trick-heavy.",
"Assassin's Creed Valhalla": "Viking open-world epic of raids and infiltration.",
"Assassin's Creed Mirage": "Back-to-basics stealth set in 9th-century Baghdad.",
"Far Cry 6": "Armed guerrilla warfare against a dictator on a fictional Caribbean archipelago.",
"Watch Dogs: Legion": "Recruit any Londoner to help free the city.",
"Dying Light 2": "Parkour and zombie survival in a city shaped by your choices.",
"Control": "Telekinetic powers inside an unstable government building.",
"Marvel's Guardians of the Galaxy": "Wild space adventure with Star-Lord and his crew.",
"Star Wars Jedi: Survivor": "Cal Kestis hones his lightsaber skills in a larger adventure.",
"Star Wars Jedi: Fallen Order": "A young Jedi hunted by the Empire sharpens his Force powers.",
"Batman: Arkham Knight": "Batman faces the Scarecrow in an open-world Gotham.",
};

// Repli automatique vers le français si une traduction n'est pas encore disponible.
const DESC_BY_LANG = { en: DESC_EN };
function translatedDescription(game, lang) {
  return (DESC_BY_LANG[lang] && DESC_BY_LANG[lang][game.titre]) || game.description;
}

const I18N = {
  fr: {
    genres: { "": "Tous les genres", action: "Action", aventure: "Aventure", rpg: "RPG", histoire: "Histoire / Narratif", gestion: "Gestion / Simulation", strategie: "Stratégie", horreur: "Horreur", sport: "Sport", course: "Course", plateforme: "Plateforme", combat: "Combat" },
    modes: { "": "Peu importe", solo: "Solo", multi: "Multijoueur", coop: "Coopératif" },
    platforms: { ps5: "PS5", ps4: "PS4", xbox: "Xbox", pc: "PC", switch: "Nintendo Switch" },
    sorts: { note: "Meilleure note", prix_asc: "Prix croissant", prix_desc: "Prix décroissant", recent: "Plus récents" },
    tiles: { rpg: "RPG", action: "Action", aventure: "Aventure", horreur: "Horreur", course: "Course", combat: "Combat", gestion: "Gestion / Simu", strategie: "Stratégie", solo: "Solo", multi: "En ligne / Multi", coop: "Coopératif", vr: "Réalité virtuelle", gratuit: "Gratuits", psplus: "Sur le PS Plus", gamepass: "Game Pass" },
    ui: {
      eyebrow: "Fiche N°001 — Catalogue multi-plateformes",
      title: "Trouve ton prochain jeu",
      subtitle: "Genre · plateforme · note · prix · mode — sur PS5, PS4, Xbox, PC et Nintendo Switch.",
      exploreByGenre: "Explorer par genre",
      genreLabel: "Genre", modeLabel: "Mode de jeu", keywordLabel: "Mots-clés",
      keywordPlaceholder: "ex : médiéval, spatial...",
      noteMinLabel: "Note minimale", priceMaxLabel: "Prix maximum",
      platformLabel: "Plateforme", platformAll: "Toutes",
      freeOnly: "Gratuits uniquement", onPsPlus: "Sur le PS Plus", onGamePass: "Sur le Game Pass", favorites: "Favoris",
      searchBtn: "Rechercher", searching: "Recherche...",
      myTasteProfile: "Mon profil goûts", seeRecommendations: "Voir mes recommandations",
      genresYouLike: "Genres que tu aimes", gamesYouLike: "Jeux que tu aimes déjà",
      searchGameToAdd: "Cherche un jeu à ajouter...",
      autoSaved: "Sauvegardé automatiquement sur cet appareil, pas de compte nécessaire.",
      readyToSearch: "Prêt à chercher",
      readyToSearchText: "Règle tes filtres au-dessus puis lance une recherche pour voir les jeux correspondants.",
      noResults: "Aucun résultat",
      noResultsText: "Essaie d'élargir tes critères (note plus basse, prix plus haut, genre différent, ou désactive le filtre favoris).",
      sortBy: "Trier",
      footerDisclaimer: "Les prix et notes sont indicatifs et peuvent avoir changé — à vérifier avant achat. Favoris et profil goûts sauvegardés sur cet appareil. Descriptions actuellement disponibles en français uniquement.",
      free: "Gratuit",
      tierPlatinum: "Platine", tierGold: "Or", tierSilver: "Argent", tierBronze: "Bronze",
      removeLabel: "Retirer", toggleFavoriteLabel: "Basculer favori",
      gamesFound: (n) => `${n} JEU${n > 1 ? "X" : ""} TROUVÉ${n > 1 ? "S" : ""}`,
      loadMore: "Voir plus",
    },
  },
  en: {
    genres: { "": "All genres", action: "Action", aventure: "Adventure", rpg: "RPG", histoire: "Story / Narrative", gestion: "Management / Simulation", strategie: "Strategy", horreur: "Horror", sport: "Sports", course: "Racing", plateforme: "Platformer", combat: "Fighting" },
    modes: { "": "Any", solo: "Solo", multi: "Multiplayer", coop: "Co-op" },
    platforms: { ps5: "PS5", ps4: "PS4", xbox: "Xbox", pc: "PC", switch: "Nintendo Switch" },
    sorts: { note: "Highest rated", prix_asc: "Price: low to high", prix_desc: "Price: high to low", recent: "Most recent" },
    tiles: { rpg: "RPG", action: "Action", aventure: "Adventure", horreur: "Horror", course: "Racing", combat: "Fighting", gestion: "Management / Sim", strategie: "Strategy", solo: "Solo", multi: "Online / Multiplayer", coop: "Co-op", vr: "Virtual Reality", gratuit: "Free", psplus: "On PS Plus", gamepass: "Game Pass" },
    ui: {
      eyebrow: "Entry No. 001 — Cross-platform catalog",
      title: "Find your next game",
      subtitle: "Genre · platform · rating · price · mode — on PS5, PS4, Xbox, PC and Nintendo Switch.",
      exploreByGenre: "Browse by genre",
      genreLabel: "Genre", modeLabel: "Game mode", keywordLabel: "Keywords",
      keywordPlaceholder: "e.g. medieval, space...",
      noteMinLabel: "Minimum rating", priceMaxLabel: "Maximum price",
      platformLabel: "Platform", platformAll: "All",
      freeOnly: "Free only", onPsPlus: "On PS Plus", onGamePass: "On Game Pass", favorites: "Favorites",
      searchBtn: "Search", searching: "Searching...",
      myTasteProfile: "My taste profile", seeRecommendations: "See my recommendations",
      genresYouLike: "Genres you like", gamesYouLike: "Games you already like",
      searchGameToAdd: "Search for a game to add...",
      autoSaved: "Automatically saved on this device, no account needed.",
      readyToSearch: "Ready to search",
      readyToSearchText: "Set your filters above, then search to see matching games.",
      noResults: "No results",
      noResultsText: "Try widening your criteria (lower rating, higher price, different genre, or turn off the favorites filter).",
      sortBy: "Sort",
      footerDisclaimer: "Prices and ratings are indicative and may have changed — check the store before buying. Favorites and taste profile are saved on this device. Descriptions are currently available in French only.",
      free: "Free",
      tierPlatinum: "Platinum", tierGold: "Gold", tierSilver: "Silver", tierBronze: "Bronze",
      removeLabel: "Remove", toggleFavoriteLabel: "Toggle favorite",
      gamesFound: (n) => `${n} GAME${n > 1 ? "S" : ""} FOUND`,
      loadMore: "Load more",
    },
  },
  es: {
    genres: { "": "Todos los géneros", action: "Acción", aventure: "Aventura", rpg: "RPG", histoire: "Historia / Narrativo", gestion: "Gestión / Simulación", strategie: "Estrategia", horreur: "Terror", sport: "Deportes", course: "Carreras", plateforme: "Plataformas", combat: "Lucha" },
    modes: { "": "Cualquiera", solo: "Individual", multi: "Multijugador", coop: "Cooperativo" },
    platforms: { ps5: "PS5", ps4: "PS4", xbox: "Xbox", pc: "PC", switch: "Nintendo Switch" },
    sorts: { note: "Mejor valorados", prix_asc: "Precio: menor a mayor", prix_desc: "Precio: mayor a menor", recent: "Más recientes" },
    tiles: { rpg: "RPG", action: "Acción", aventure: "Aventura", horreur: "Terror", course: "Carreras", combat: "Lucha", gestion: "Gestión / Simu", strategie: "Estrategia", solo: "Individual", multi: "En línea / Multi", coop: "Cooperativo", vr: "Realidad virtual", gratuit: "Gratis", psplus: "En PS Plus", gamepass: "Game Pass" },
    ui: {
      eyebrow: "Ficha N.º 001 — Catálogo multiplataforma",
      title: "Encuentra tu próximo juego",
      subtitle: "Género · plataforma · valoración · precio · modo — en PS5, PS4, Xbox, PC y Nintendo Switch.",
      exploreByGenre: "Explorar por género",
      genreLabel: "Género", modeLabel: "Modo de juego", keywordLabel: "Palabras clave",
      keywordPlaceholder: "ej: medieval, espacial...",
      noteMinLabel: "Valoración mínima", priceMaxLabel: "Precio máximo",
      platformLabel: "Plataforma", platformAll: "Todas",
      freeOnly: "Solo gratuitos", onPsPlus: "En PS Plus", onGamePass: "En Game Pass", favorites: "Favoritos",
      searchBtn: "Buscar", searching: "Buscando...",
      myTasteProfile: "Mi perfil de gustos", seeRecommendations: "Ver mis recomendaciones",
      genresYouLike: "Géneros que te gustan", gamesYouLike: "Juegos que ya te gustan",
      searchGameToAdd: "Busca un juego para añadir...",
      autoSaved: "Guardado automáticamente en este dispositivo, sin necesidad de cuenta.",
      readyToSearch: "Listo para buscar",
      readyToSearchText: "Ajusta tus filtros arriba y luego busca para ver los juegos que coinciden.",
      noResults: "Sin resultados",
      noResultsText: "Prueba a ampliar tus criterios (valoración más baja, precio más alto, otro género, o desactiva el filtro de favoritos).",
      sortBy: "Ordenar",
      footerDisclaimer: "Los precios y valoraciones son orientativos y pueden haber cambiado — verifica en la tienda antes de comprar. Favoritos y perfil de gustos guardados en este dispositivo. Las descripciones solo están disponibles en francés por ahora.",
      free: "Gratis",
      tierPlatinum: "Platino", tierGold: "Oro", tierSilver: "Plata", tierBronze: "Bronce",
      removeLabel: "Quitar", toggleFavoriteLabel: "Alternar favorito",
      gamesFound: (n) => `${n} JUEGO${n > 1 ? "S" : ""} ENCONTRADO${n > 1 ? "S" : ""}`,
      loadMore: "Ver más",
    },
  },
  ja: {
    genres: { "": "すべてのジャンル", action: "アクション", aventure: "アドベンチャー", rpg: "RPG", histoire: "ストーリー / ナラティブ", gestion: "経営 / シミュレーション", strategie: "ストラテジー", horreur: "ホラー", sport: "スポーツ", course: "レース", plateforme: "プラットフォーマー", combat: "格闘" },
    modes: { "": "指定なし", solo: "ソロ", multi: "マルチプレイヤー", coop: "協力プレイ" },
    platforms: { ps5: "PS5", ps4: "PS4", xbox: "Xbox", pc: "PC", switch: "Nintendo Switch" },
    sorts: { note: "評価が高い順", prix_asc: "価格が安い順", prix_desc: "価格が高い順", recent: "新しい順" },
    tiles: { rpg: "RPG", action: "アクション", aventure: "アドベンチャー", horreur: "ホラー", course: "レース", combat: "格闘", gestion: "経営 / シム", strategie: "ストラテジー", solo: "ソロ", multi: "オンライン / マルチ", coop: "協力プレイ", vr: "VR", gratuit: "無料", psplus: "PS Plus対象", gamepass: "Game Pass" },
    ui: {
      eyebrow: "No.001 — マルチプラットフォーム・カタログ",
      title: "次に遊ぶゲームを見つけよう",
      subtitle: "ジャンル・プラットフォーム・評価・価格・モード — PS5、PS4、Xbox、PC、Nintendo Switch対応。",
      exploreByGenre: "ジャンルから探す",
      genreLabel: "ジャンル", modeLabel: "プレイモード", keywordLabel: "キーワード",
      keywordPlaceholder: "例：中世、宇宙...",
      noteMinLabel: "最低評価", priceMaxLabel: "上限価格",
      platformLabel: "プラットフォーム", platformAll: "すべて",
      freeOnly: "無料のみ", onPsPlus: "PS Plus対象", onGamePass: "Game Pass対象", favorites: "お気に入り",
      searchBtn: "検索", searching: "検索中...",
      myTasteProfile: "好みプロフィール", seeRecommendations: "おすすめを見る",
      genresYouLike: "好きなジャンル", gamesYouLike: "好きなゲーム",
      searchGameToAdd: "追加するゲームを検索...",
      autoSaved: "この端末に自動保存されます。アカウント登録は不要です。",
      readyToSearch: "検索の準備完了",
      readyToSearchText: "上のフィルターを設定して検索すると、該当するゲームが表示されます。",
      noResults: "該当なし",
      noResultsText: "条件を広げてみてください（評価を下げる、価格を上げる、ジャンルを変える、お気に入りフィルターを解除するなど）。",
      sortBy: "並び替え",
      footerDisclaimer: "価格と評価は目安であり、変更されている場合があります — 購入前にストアでご確認ください。お気に入りと好みプロフィールはこの端末に保存されます。説明文は現在フランス語のみ対応です。",
      free: "無料",
      tierPlatinum: "プラチナ", tierGold: "ゴールド", tierSilver: "シルバー", tierBronze: "ブロンズ",
      removeLabel: "削除", toggleFavoriteLabel: "お気に入り切替",
      gamesFound: (n) => `${n}件のゲームが見つかりました`,
      loadMore: "もっと見る",
    },
  },
  it: {
    genres: { "": "Tutti i generi", action: "Azione", aventure: "Avventura", rpg: "RPG", histoire: "Storia / Narrativo", gestion: "Gestione / Simulazione", strategie: "Strategia", horreur: "Horror", sport: "Sport", course: "Corse", plateforme: "Piattaforma", combat: "Combattimento" },
    modes: { "": "Indifferente", solo: "Singolo", multi: "Multigiocatore", coop: "Cooperativa" },
    platforms: { ps5: "PS5", ps4: "PS4", xbox: "Xbox", pc: "PC", switch: "Nintendo Switch" },
    sorts: { note: "Voto più alto", prix_asc: "Prezzo crescente", prix_desc: "Prezzo decrescente", recent: "Più recenti" },
    tiles: { rpg: "RPG", action: "Azione", aventure: "Avventura", horreur: "Horror", course: "Corse", combat: "Combattimento", gestion: "Gestione / Sim", strategie: "Strategia", solo: "Singolo", multi: "Online / Multi", coop: "Cooperativa", vr: "Realtà virtuale", gratuit: "Gratuiti", psplus: "Su PS Plus", gamepass: "Game Pass" },
    ui: {
      eyebrow: "Scheda N.001 — Catalogo multipiattaforma",
      title: "Trova il tuo prossimo gioco",
      subtitle: "Genere · piattaforma · voto · prezzo · modalità — su PS5, PS4, Xbox, PC e Nintendo Switch.",
      exploreByGenre: "Esplora per genere",
      genreLabel: "Genere", modeLabel: "Modalità di gioco", keywordLabel: "Parole chiave",
      keywordPlaceholder: "es: medievale, spaziale...",
      noteMinLabel: "Voto minimo", priceMaxLabel: "Prezzo massimo",
      platformLabel: "Piattaforma", platformAll: "Tutte",
      freeOnly: "Solo gratuiti", onPsPlus: "Su PS Plus", onGamePass: "Su Game Pass", favorites: "Preferiti",
      searchBtn: "Cerca", searching: "Ricerca...",
      myTasteProfile: "Il mio profilo gusti", seeRecommendations: "Vedi i miei consigli",
      genresYouLike: "Generi che ti piacciono", gamesYouLike: "Giochi che già ti piacciono",
      searchGameToAdd: "Cerca un gioco da aggiungere...",
      autoSaved: "Salvato automaticamente su questo dispositivo, nessun account necessario.",
      readyToSearch: "Pronto per cercare",
      readyToSearchText: "Imposta i filtri sopra, poi avvia la ricerca per vedere i giochi corrispondenti.",
      noResults: "Nessun risultato",
      noResultsText: "Prova ad ampliare i criteri (voto più basso, prezzo più alto, genere diverso, o disattiva il filtro preferiti).",
      sortBy: "Ordina",
      footerDisclaimer: "Prezzi e voti sono indicativi e potrebbero essere cambiati — verifica sullo store prima dell'acquisto. Preferiti e profilo gusti salvati su questo dispositivo. Le descrizioni sono attualmente disponibili solo in francese.",
      free: "Gratuito",
      tierPlatinum: "Platino", tierGold: "Oro", tierSilver: "Argento", tierBronze: "Bronzo",
      removeLabel: "Rimuovi", toggleFavoriteLabel: "Attiva/disattiva preferito",
      gamesFound: (n) => `${n} GIOC${n > 1 ? "HI TROVATI" : "O TROVATO"}`,
      loadMore: "Vedi altri",
    },
  },
};

// Système de "palier trophée" façon PlayStation, plutôt qu'un simple code
// couleur générique — la note d'un jeu se lit comme un trophée obtenu.
// Les lueurs sont volontairement discrètes : un fin liseré plutôt qu'un halo.
function trophyTier(note) {
  if (note >= 90) return { key: "tierPlatinum", color: "#CFE8FF" };
  if (note >= 78) return { key: "tierGold", color: "#E8B93C" };
  if (note >= 60) return { key: "tierSilver", color: "#B9C2CF" };
  return { key: "tierBronze", color: "#C97B4A" };
}

// Petite palette douce pour distinguer les genres d'un simple coup d'œil
// (pastille de couleur avant le libellé, plutôt qu'un tag uniformément gris).
const GENRE_DOT_COLORS = {
  action: "#FF6B6B",
  aventure: "#4ECDC4",
  rpg: "#A78BFA",
  histoire: "#F7B267",
  gestion: "#6FCF97",
  strategie: "#56CCF2",
  horreur: "#EB5757",
  sport: "#F2C94C",
  course: "#F2994A",
  plateforme: "#BB6BD9",
  combat: "#EF5DA8",
};
function genreDotColor(genre) {
  return GENRE_DOT_COLORS[genre] || "var(--muted)";
}

// Génère 1-2 initiales à partir du titre, pour la miniature stylisée
// (on ne peut pas utiliser de vraies jaquettes, protégées par le droit d'auteur).
function initials(titre) {
  const words = titre.replace(/[:'’]/g, "").split(/\s+/).filter(Boolean);
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return (words[0][0] + words[1][0]).toUpperCase();
}

// Catalogue PS Plus (Extra / Premium) : liste indicative des jeux qui font
// (ou ont fait) partie du catalogue à télécharger de l'abonnement. Ce
// catalogue tourne chaque mois côté Sony — à vérifier dans l'appli PS Plus
// pour la disponibilité exacte au moment où tu lis ceci.
const PSPLUS_CATALOG = {
  "God of War Ragnarök": "extra",
  "Marvel's Spider-Man: Miles Morales": "extra",
  "Returnal": "extra",
  "Death Stranding Director's Cut": "extra",
  "Ghost of Tsushima": "extra",
  "Horizon Forbidden West": "extra",
  "Nioh 2": "extra",
  "Resident Evil 7: Biohazard": "extra",
  "Resident Evil Village": "extra",
  "Days Gone": "extra",
  "Kena: Bridge of Spirits": "extra",
  "Stray": "extra",
  "It Takes Two": "extra",
  "A Plague Tale: Requiem": "extra",
  "Cyberpunk 2077": "extra",
  "Diablo IV": "extra",
  "Yakuza: Like a Dragon": "extra",
  "Nier: Automata": "extra",
  "Final Fantasy VII Remake": "extra",
  "Dead Cells": "extra",
  "Hollow Knight": "extra",
  "Slay the Spire": "extra",
  "Sifu": "extra",
  "Assassin's Creed Valhalla": "extra",
  "Far Cry 6": "extra",
  "Watch Dogs: Legion": "extra",
  "Persona 5 Royal": "extra",
  "Remnant II": "extra",
  "Dying Light 2": "extra",
  "Lies of P": "extra",
  "Alan Wake 2": "extra",
  "Bloodborne": "premium",
  "Fallout 4": "premium",
  "Fallout: New Vegas": "premium",
  "The Elder Scrolls V: Skyrim": "premium",
  "Metal Gear Solid V: The Phantom Pain": "premium",
  "Until Dawn": "premium",
  "Mafia: Definitive Edition": "premium",
};
function getPsPlusTier(titre) {
  return PSPLUS_CATALOG[titre] || null;
}
const PSPLUS_STYLE = {
  extra: { label: "PS Plus Extra", color: "#00B9F1" },
  premium: { label: "PS Plus Premium", color: "#7B5CFA" },
};

// Catalogue Xbox Game Pass : liste indicative des jeux qui font (ou ont
// fait) partie du catalogue à télécharger de l'abonnement. Comme pour le
// PS Plus, ce catalogue tourne régulièrement côté Microsoft — à vérifier
// dans l'appli Xbox pour la disponibilité exacte au moment où tu lis ceci.
const GAMEPASS_CATALOG = new Set([
  "Halo Infinite",
  "Sea of Thieves",
  "Gears Tactics",
  "Sunset Overdrive",
  "Hi-Fi Rush",
  "Grounded",
  "Yakuza: Like a Dragon",
  "Persona 3 Reload",
  "Persona 5 Royal",
  "Football Manager 2024",
  "Diablo IV",
  "Baldur's Gate 3",
  "Hollow Knight",
  "Dead Cells",
  "Slay the Spire",
  "Hades",
  "It Takes Two",
  "Remnant II",
  "Cult of the Lamb",
  "Vampire Survivors",
  "Balatro",
  "Age of Wonders 4",
  "Manor Lords",
]);
function isOnGamePass(titre) {
  return GAMEPASS_CATALOG.has(titre);
}
const GAMEPASS_STYLE = { label: "Xbox Game Pass", color: "#5FBE4B" };

function sortGames(list, sortKey) {
  const arr = [...list];
  if (sortKey === "prix_asc") arr.sort((a, b) => a.prix - b.prix);
  else if (sortKey === "prix_desc") arr.sort((a, b) => b.prix - a.prix);
  else if (sortKey === "recent") arr.sort((a, b) => b.annee - a.annee);
  else arr.sort((a, b) => b.note - a.note);
  return arr;
}


const THEMES = {
  original: {
    label: "Original",
    accent: "#29D3FF", accentRgb: "41,211,255",
    bgImage: "radial-gradient(120% 90% at 50% -10%, #101B36 0%, #060812 55%)",
    text: "#F5F7FC", textAlt: "#DCE1F0", muted: "#8993B0", mutedAlt: "#B4BAD1", mutedSoft: "#5B6480", deep: "#0A0E1C",
    panelRgb: "255,255,255", panelBorder: "1px solid rgba(255,255,255,0.09)", panelBlur: "blur(14px)",
    inputBg: "rgba(6,8,18,0.6)",
    btnBg: "var(--accent)", btnText: "#04121A", btnBorder: "none", btnTransform: "none", btnTracking: "normal",
    radius: "16px", radiusSm: "9px", radiusBtn: "10px", radiusCard: "14px",
    shadowBtn: "0 2px 0 rgba(var(--accent-rgb),0.5)", shadowCard: "none",
    fontDisplay: "Sora",
  },
  clair: {
    label: "Clair",
    accent: "#6C4CF1", accentRgb: "108,76,241",
    bgImage: "radial-gradient(120% 90% at 50% -10%, #ECEEFB 0%, #F7F8FC 55%)",
    text: "#14152B", textAlt: "#1E2140", muted: "#6B7094", mutedAlt: "#4B4F6B", mutedSoft: "#7B7FA0", deep: "#FFFFFF",
    panelRgb: "20,21,43", panelBorder: "1px solid rgba(20,21,43,0.09)", panelBlur: "blur(14px)",
    inputBg: "#F0F1FA",
    btnBg: "var(--accent)", btnText: "#FFFFFF", btnBorder: "none", btnTransform: "none", btnTracking: "normal",
    radius: "22px", radiusSm: "12px", radiusBtn: "14px", radiusCard: "18px",
    shadowBtn: "0 2px 6px rgba(0,0,0,0.18)", shadowCard: "none",
    fontDisplay: "Fredoka",
  },
  arcade: {
    label: "Arcade",
    accent: "#FF2E9A", accentRgb: "255,46,154",
    bgImage: "#0A0A0A",
    text: "#FFFFFF", textAlt: "#FFFFFF", muted: "#B8B8B8", mutedAlt: "#C9C9C9", mutedSoft: "#8A8A8A", deep: "#000000",
    panelRgb: "255,255,255", panelBorder: "2px solid #FF2E9A", panelBlur: "none",
    inputBg: "rgba(6,8,18,0.6)",
    btnBg: "#FFE600", btnText: "#0A0A0A", btnBorder: "2px solid #0A0A0A", btnTransform: "uppercase", btnTracking: "0.04em",
    radius: "4px", radiusSm: "3px", radiusBtn: "4px", radiusCard: "4px",
    shadowBtn: "5px 5px 0 #FF2E9A", shadowCard: "3px 3px 0 rgba(255,255,255,0.06)",
    fontDisplay: "Press Start 2P",
    titleWeight: 400, titleSize: "clamp(16px, 3.4vw, 25px)", titleTracking: "0", titleLineHeight: 1.5,
    titleColor: "#FFE600", titleShadow: "3px 3px 0 #FF2E9A",
  },
  luxe: {
    label: "Boutique",
    accent: "#D4AF37", accentRgb: "212,175,55",
    bgImage: "linear-gradient(180deg, #171310 0%, #0F0D0A 60%)",
    text: "#F5EFE0", textAlt: "#F5EFE0", muted: "#9C9284", mutedAlt: "#B8AE9C", mutedSoft: "#7A7062", deep: "#171310",
    panelRgb: "212,175,55", panelBorder: "1px solid rgba(212,175,55,0.35)", panelBlur: "none",
    inputBg: "#0F0D0A",
    btnBg: "transparent", btnText: "var(--accent)", btnBorder: "1px solid var(--accent)", btnTransform: "uppercase", btnTracking: "0.14em",
    radius: "6px", radiusSm: "3px", radiusBtn: "3px", radiusCard: "4px",
    shadowBtn: "none", shadowCard: "none",
    fontDisplay: "Playfair Display",
    titleItalic: true, titleWeight: 700, titleTracking: "0", titleLineHeight: 1.15,
  },
  foret: {
    label: "Forêt",
    accent: "#8FBF7A", accentRgb: "143,191,122",
    bgImage: "radial-gradient(120% 90% at 50% -10%, #16261B 0%, #0F1B14 55%)",
    text: "#EFF5EC", textAlt: "#EFF5EC", muted: "#8FA08C", mutedAlt: "#A9BBA3", mutedSoft: "#6E8069", deep: "#16261B",
    panelRgb: "255,255,255", panelBorder: "1px solid rgba(255,255,255,0.09)", panelBlur: "blur(14px)",
    inputBg: "rgba(6,8,18,0.6)",
    btnBg: "var(--accent)", btnText: "#16261B", btnBorder: "none", btnTransform: "none", btnTracking: "normal",
    radius: "20px", radiusSm: "9px", radiusBtn: "999px", radiusCard: "18px",
    shadowBtn: "0 2px 0 rgba(var(--accent-rgb),0.5)", shadowCard: "none",
    fontDisplay: "Quicksand",
  },
  sunset: {
    label: "Sunset",
    accent: "#FF6B35", accentRgb: "255,107,53",
    bgImage: "linear-gradient(180deg, #2B0B3F 0%, #5C1A4A 45%, #9A2F4F 75%, #C24A3F 100%)",
    text: "#FFEFE0", textAlt: "#FFEFE0", muted: "#D8A9C9", mutedAlt: "#E8C4D8", mutedSoft: "#B589A6", deep: "#2B0B3F",
    panelRgb: "255,255,255", panelBorder: "1px solid rgba(255,255,255,0.09)", panelBlur: "blur(14px)",
    inputBg: "rgba(6,8,18,0.6)",
    btnBg: "var(--accent)", btnText: "#2B0B3F", btnBorder: "none", btnTransform: "none", btnTracking: "normal",
    radius: "14px", radiusSm: "9px", radiusBtn: "10px", radiusCard: "14px",
    shadowBtn: "0 2px 0 rgba(var(--accent-rgb),0.5)", shadowCard: "none",
    fontDisplay: "Audiowide",
  },
};

export default function App() {
  const [genre, setGenre] = useState("");
  const [plateforme, setPlateforme] = useState("");
  const [noteMin, setNoteMin] = useState(70);
  const [prixMax, setPrixMax] = useState(70);
  const [mode, setMode] = useState("");
  const [keyword, setKeyword] = useState("");
  const [freeOnly, setFreeOnly] = useState(false);
  const [psPlusOnly, setPsPlusOnly] = useState(false);
  const [gamePassOnly, setGamePassOnly] = useState(false);
  const [sortKey, setSortKey] = useState("note");
  const [favorites, setFavorites] = useState(() => new Set());
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [games, setGames] = useState([]);
  const [visibleCount, setVisibleCount] = useState(30);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [tasteGenres, setTasteGenres] = useState([]);
  const [tasteLiked, setTasteLiked] = useState([]);
  const [tasteSearch, setTasteSearch] = useState("");
  const [showTasteEditor, setShowTasteEditor] = useState(false);
  const [tasteLoaded, setTasteLoaded] = useState(false);
  const [theme, setTheme] = useState("original");
  const [lang, setLang] = useState("fr");
  const fontsInjected = useRef(false);

  useEffect(() => {
    if (fontsInjected.current) return;
    fontsInjected.current = true;
    try {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href =
        "https://fonts.googleapis.com/css2?family=Sora:wght@500;600;700;800&family=Fredoka:wght@500;600;700&family=Press+Start+2P&family=Playfair+Display:ital,wght@0,700;1,700&family=Quicksand:wght@500;600;700&family=Audiowide&family=Inter:wght@400;500;600&family=Space+Grotesk:wght@500;600;700&display=swap";
      document.head.appendChild(link);
    } catch (e) {
      // cosmétique uniquement
    }
  }, []);

  // Charge le thème visuel choisi (stockage local à l'appareil).
  useEffect(() => {
    try {
      const value = localStorage.getItem("selected-theme");
      if (value && THEMES[value]) {
        setTheme(value);
      }
    } catch (e) {
      // pas de préférence sauvegardée, on garde le thème par défaut
    }
  }, []);

  function chooseTheme(id) {
    setTheme(id);
    try {
      localStorage.setItem("selected-theme", id);
    } catch (e) {
      // sauvegarde impossible, le thème reste actif pour cette session
    }
  }

  // Charge la langue choisie (stockage local à l'appareil).
  useEffect(() => {
    try {
      const value = localStorage.getItem("selected-lang");
      if (value && I18N[value]) {
        setLang(value);
      }
    } catch (e) {
      // pas de préférence sauvegardée, on garde le français par défaut
    }
  }, []);

  function chooseLang(code) {
    setLang(code);
    try {
      localStorage.setItem("selected-lang", code);
    } catch (e) {
      // sauvegarde impossible, la langue reste active pour cette session
    }
  }

  const T = I18N[lang].ui;
  const trGenre = (v) => I18N[lang].genres[v] ?? v;
  const trMode = (v) => I18N[lang].modes[v] ?? v;
  const trPlatform = (v) => I18N[lang].platforms[v] ?? v;
  const trSort = (v) => I18N[lang].sorts[v] ?? v;
  const trTile = (k) => I18N[lang].tiles[k] ?? k;

  // Charge le profil goûts sauvegardé (stockage local à l'appareil, personnel).
  useEffect(() => {
    try {
      const value = localStorage.getItem("taste-profile");
      if (value) {
        const parsed = JSON.parse(value);
        setTasteGenres(parsed.genres || []);
        setTasteLiked(parsed.liked || []);
      }
    } catch (e) {
      // pas de profil sauvegardé pour l'instant, rien à faire
    } finally {
      setTasteLoaded(true);
    }
  }, []);

  // Sauvegarde automatique du profil dès qu'il change (après le chargement initial).
  useEffect(() => {
    if (!tasteLoaded) return;
    try {
      localStorage.setItem("taste-profile", JSON.stringify({ genres: tasteGenres, liked: tasteLiked }));
    } catch (e) {
      // sauvegarde impossible, on continue sans bloquer l'appli
    }
  }, [tasteGenres, tasteLiked, tasteLoaded]);

  function toggleTasteGenre(g) {
    setTasteGenres((prev) => (prev.includes(g) ? prev.filter((x) => x !== g) : [...prev, g]));
  }

  function toggleTasteLiked(titre) {
    setTasteLiked((prev) => (prev.includes(titre) ? prev.filter((x) => x !== titre) : [...prev, titre]));
  }

  // Recommandations : score chaque jeu selon l'affinité avec les genres
  // choisis et les jeux aimés, puis trie par pertinence puis par note.
  function getRecommendations() {
    const likedGames = GAMES_DB.filter((g) => tasteLiked.includes(g.titre));
    const likedGenreCount = {};
    likedGames.forEach((g) => {
      likedGenreCount[g.genre] = (likedGenreCount[g.genre] || 0) + 1;
    });
    return GAMES_DB.filter((g) => !tasteLiked.includes(g.titre))
      .map((g) => {
        let score = 0;
        if (tasteGenres.includes(g.genre)) score += 2;
        score += (likedGenreCount[g.genre] || 0) * 2.5;
        score += g.note / 100;
        return { ...g, _score: score };
      })
      .filter((g) => g._score > 0)
      .sort((a, b) => b._score - a._score)
      .slice(0, 18);
  }

  function showRecommendations() {
    setHasSearched(true);
    setShowTasteEditor(false);
    setLoading(true);
    setTimeout(() => {
      setGames(getRecommendations());
      setLoading(false);
    }, 200);
  }

  function toggleFavorite(titre) {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(titre)) next.delete(titre);
      else next.add(titre);
      return next;
    });
  }

  function handleSearch(overrides = {}) {
    setLoading(true);
    setHasSearched(true);
    const eff = { genre, plateforme, noteMin, prixMax, mode, keyword, freeOnly, psPlusOnly, gamePassOnly, showFavoritesOnly, ...overrides };
    setTimeout(() => {
      const kw = (eff.keyword || "").trim().toLowerCase();
      let results = GAMES_DB.filter((g) => {
        if (eff.genre && g.genre !== eff.genre) return false;
        if (eff.plateforme && !(g.plateformes || []).includes(eff.plateforme)) return false;
        if (g.note < eff.noteMin) return false;
        if (g.prix > eff.prixMax) return false;
        if (eff.freeOnly && g.prix !== 0) return false;
        if (eff.psPlusOnly && !getPsPlusTier(g.titre)) return false;
        if (eff.gamePassOnly && !isOnGamePass(g.titre)) return false;
        if (eff.mode) {
          const modeMatch =
            (eff.mode === "solo" && (g.mode === "Solo" || g.mode === "Solo/Multi")) ||
            (eff.mode === "multi" && (g.mode === "Multijoueur" || g.mode === "Solo/Multi")) ||
            (eff.mode === "coop" && g.mode === "Coopératif");
          if (!modeMatch) return false;
        }
        if (kw) {
          const haystack = (g.titre + " " + g.description + " " + g.genre).toLowerCase();
          if (!haystack.includes(kw)) return false;
        }
        return true;
      });
      if (eff.showFavoritesOnly) results = results.filter((g) => favorites.has(g.titre));
      setGames(sortGames(results, sortKey));
      setVisibleCount(30);
      setLoading(false);
    }, 200);
  }

  // Tuile de découverte cliquée : réinitialise les filtres avancés puis
  // applique le préréglage de la tuile (genre, mode, mot-clé...).
  function applyTile(tile) {
    const preset = tile.preset;
    const next = {
      genre: preset.genre || "",
      plateforme: preset.plateforme || "",
      mode: preset.mode || "",
      keyword: preset.keyword || "",
      freeOnly: !!preset.freeOnly,
      psPlusOnly: !!preset.psPlusOnly,
      gamePassOnly: !!preset.gamePassOnly,
      noteMin: 0,
      prixMax: 120,
      showFavoritesOnly: false,
    };
    setGenre(next.genre);
    setPlateforme(next.plateforme);
    setMode(next.mode);
    setKeyword(next.keyword);
    setFreeOnly(next.freeOnly);
    setPsPlusOnly(next.psPlusOnly);
    setGamePassOnly(next.gamePassOnly);
    setNoteMin(0);
    setPrixMax(80);
    setShowFavoritesOnly(false);
    handleSearch(next);
  }

  // Re-trie / refiltre localement sans relancer toute la recherche quand
  // le tri ou le filtre favoris changent après une première recherche.
  useEffect(() => {
    if (!hasSearched) return;
    handleSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortKey, showFavoritesOnly, psPlusOnly, gamePassOnly, plateforme]);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--bg-image)",
        color: "var(--text)",
        fontFamily: "'Inter', sans-serif",
        paddingBottom: "48px",
        position: "relative",
        overflow: "hidden",
        transition: "background 0.3s ease, color 0.3s ease",
        "--bg-image": THEMES[theme].bgImage,
        "--accent": THEMES[theme].accent,
        "--accent-rgb": THEMES[theme].accentRgb,
        "--text": THEMES[theme].text,
        "--text-alt": THEMES[theme].textAlt,
        "--muted": THEMES[theme].muted,
        "--muted-alt": THEMES[theme].mutedAlt,
        "--muted-soft": THEMES[theme].mutedSoft,
        "--deep": THEMES[theme].deep,
        "--panel-rgb": THEMES[theme].panelRgb,
        "--panel-border": THEMES[theme].panelBorder,
        "--panel-blur": THEMES[theme].panelBlur,
        "--input-bg": THEMES[theme].inputBg,
        "--btn-bg": THEMES[theme].btnBg,
        "--btn-text": THEMES[theme].btnText,
        "--btn-border": THEMES[theme].btnBorder,
        "--btn-transform": THEMES[theme].btnTransform,
        "--btn-tracking": THEMES[theme].btnTracking,
        "--radius": THEMES[theme].radius,
        "--radius-sm": THEMES[theme].radiusSm,
        "--radius-btn": THEMES[theme].radiusBtn,
        "--radius-card": THEMES[theme].radiusCard,
        "--shadow-btn": THEMES[theme].shadowBtn,
        "--shadow-card": THEMES[theme].shadowCard,
        "--font-display": `'${THEMES[theme].fontDisplay}'`,
      }}
    >
      <GlobalStyles />

      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "40px 20px 0", position: "relative" }}>
        {/* En-tête façon étiquette de tiroir de fichier — signature du catalogue */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "10px",
            border: "1px solid rgba(var(--panel-rgb),0.25)",
            borderRadius: "3px",
            padding: "6px 12px",
            marginBottom: "14px",
          }}
        >
          <Gamepad2 size={14} color="var(--accent)" />
          <span
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "11px",
              letterSpacing: "0.18em",
              color: "var(--muted)",
              textTransform: "uppercase",
            }}
          >
            {T.eyebrow}
          </span>
        </div>

        <h1
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 700,
            fontStyle: THEMES[theme].titleItalic ? "italic" : "normal",
            fontSize: "clamp(22px, 3.6vw, 30px)",
            letterSpacing: "-0.01em",
            margin: "0 0 6px",
            lineHeight: 1.2,
            color: "var(--text)",
            borderBottom: "2px solid var(--accent)",
            paddingBottom: "10px",
            display: "inline-block",
          }}
        >
          {T.title}
        </h1>
        <p style={{ color: "var(--muted)", fontSize: "14px", margin: "10px 0 22px", maxWidth: "560px" }}>
          {T.subtitle}
        </p>

        {/* Sélecteur de langue à drapeaux */}
        <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginBottom: "12px" }}>
          {LANGUAGES.map((l) => (
            <button
              key={l.code}
              onClick={() => chooseLang(l.code)}
              title={l.label}
              aria-label={l.label}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "5px",
                background: lang === l.code ? "rgba(var(--panel-rgb),0.1)" : "transparent",
                border: lang === l.code ? "1.5px solid var(--accent)" : "1.5px solid rgba(var(--panel-rgb),0.15)",
                borderRadius: "3px",
                padding: "4px 9px",
                cursor: "pointer",
              }}
            >
              <span style={{ fontSize: "14px", lineHeight: 1 }}>{l.flag}</span>
              <span style={{ fontSize: "11px", fontWeight: 600, color: "var(--text)", fontFamily: "'Space Grotesk', sans-serif" }}>
                {l.code.toUpperCase()}
              </span>
            </button>
          ))}
        </div>

        {/* Sélecteur de thème visuel */}
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "24px" }}>
          {Object.entries(THEMES).map(([id, t]) => (
            <button
              key={id}
              onClick={() => chooseTheme(id)}
              title={t.label}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                background: theme === id ? "rgba(var(--panel-rgb),0.1)" : "transparent",
                border: theme === id ? `1.5px solid ${t.accent}` : "1.5px solid rgba(var(--panel-rgb),0.15)",
                borderRadius: "3px",
                padding: "5px 10px 5px 5px",
                cursor: "pointer",
              }}
            >
              <span style={{ width: "10px", height: "10px", borderRadius: "2px", background: t.accent, flexShrink: 0 }} />
              <span style={{ fontSize: "11px", fontWeight: 600, color: "var(--text)", fontFamily: "'Space Grotesk', sans-serif" }}>
                {t.label}
              </span>
            </button>
          ))}
        </div>

        {/* Profil goûts — préférences enregistrées localement sur cet appareil */}
        <div style={{ marginBottom: "20px" }}>
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            <button
              onClick={() => setShowTasteEditor((v) => !v)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "7px",
                border: `1px solid ${showTasteEditor ? "#A78BFA" : "rgba(var(--panel-rgb),0.15)"}`,
                background: showTasteEditor ? "rgba(167,139,250,0.14)" : "rgba(var(--panel-rgb),0.04)",
                color: showTasteEditor ? "#A78BFA" : "var(--text-alt)",
                borderRadius: "10px",
                padding: "9px 14px",
                fontSize: "13px",
                fontFamily: "var(--font-display), sans-serif",
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              <Sparkles size={15} />
              {T.myTasteProfile}
            </button>
            {(tasteGenres.length > 0 || tasteLiked.length > 0) && (
              <button
                onClick={showRecommendations}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "7px",
                  border: "1px solid var(--accent)66",
                  background: "rgba(var(--accent-rgb),0.12)",
                  color: "var(--accent)",
                  borderRadius: "10px",
                  padding: "9px 14px",
                  fontSize: "13px",
                  fontFamily: "var(--font-display), sans-serif",
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                {T.seeRecommendations}
              </button>
            )}
          </div>

          {showTasteEditor && (
            <div className="pgf-panel" style={{ marginTop: "12px" }}>
              <span className="pgf-label" style={{ display: "block", marginBottom: "10px" }}>
                {T.genresYouLike}
              </span>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "20px" }}>
                {GENRE_KEYS.filter((g) => g).map((g) => (
                  <ToggleChip
                    key={g}
                    active={tasteGenres.includes(g)}
                    onClick={() => toggleTasteGenre(g)}
                    label={trGenre(g)}
                  />
                ))}
              </div>

              <span className="pgf-label" style={{ display: "block", marginBottom: "10px" }}>
                {T.gamesYouLike}
              </span>
              <input
                className="pgf-input"
                type="text"
                placeholder={T.searchGameToAdd}
                value={tasteSearch}
                onChange={(e) => setTasteSearch(e.target.value)}
              />
              {tasteSearch.trim().length > 1 && (
                <div style={{ marginTop: "8px", display: "flex", flexDirection: "column", gap: "4px", maxHeight: "160px", overflowY: "auto" }}>
                  {GAMES_DB.filter(
                    (g) =>
                      g.titre.toLowerCase().includes(tasteSearch.trim().toLowerCase()) &&
                      !tasteLiked.includes(g.titre)
                  )
                    .slice(0, 6)
                    .map((g) => (
                      <button
                        key={g.titre}
                        onClick={() => {
                          toggleTasteLiked(g.titre);
                          setTasteSearch("");
                        }}
                        style={{
                          textAlign: "left",
                          background: "rgba(var(--panel-rgb),0.05)",
                          border: "1px solid rgba(var(--panel-rgb),0.08)",
                          borderRadius: "8px",
                          padding: "8px 10px",
                          color: "var(--text-alt)",
                          fontSize: "13px",
                          cursor: "pointer",
                        }}
                      >
                        + {g.titre}
                      </button>
                    ))}
                </div>
              )}

              {tasteLiked.length > 0 && (
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "12px" }}>
                  {tasteLiked.map((titre) => (
                    <span
                      key={titre}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        fontSize: "12px",
                        color: "var(--text)",
                        background: "rgba(167,139,250,0.15)",
                        border: "1px solid #A78BFA55",
                        borderRadius: "999px",
                        padding: "5px 6px 5px 12px",
                      }}
                    >
                      {titre}
                      <button
                        onClick={() => toggleTasteLiked(titre)}
                        aria-label={T.removeLabel}
                        style={{ background: "none", border: "none", color: "#A78BFA", cursor: "pointer", fontSize: "14px", lineHeight: 1, padding: "2px" }}
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              )}

              <p style={{ fontSize: "12px", color: "var(--muted-soft)", marginTop: "16px", marginBottom: 0 }}>
            {T.autoSaved}
              </p>
            </div>
          )}
        </div>

        {/* Barre de filtres — panneau verre dépoli */}
        <div className="pgf-panel">
          <div className="pgf-filter-row">
            <FilterField label={T.genreLabel}>
              <select className="pgf-select" value={genre} onChange={(e) => setGenre(e.target.value)}>
                {GENRE_KEYS.map((g) => (
                  <option key={g} value={g}>
                    {trGenre(g)}
                  </option>
                ))}
              </select>
            </FilterField>

            <FilterField label={T.modeLabel}>
              <select className="pgf-select" value={mode} onChange={(e) => setMode(e.target.value)}>
                {MODE_KEYS.map((m) => (
                  <option key={m} value={m}>
                    {trMode(m)}
                  </option>
                ))}
              </select>
            </FilterField>

            <FilterField label={T.keywordLabel}>
              <input
                className="pgf-input"
                type="text"
                placeholder={T.keywordPlaceholder}
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              />
            </FilterField>
          </div>

          <div className="pgf-filter-row" style={{ marginTop: "18px" }}>
            <FilterField label={`${T.noteMinLabel} · ${noteMin}/100`}>
              <input
                type="range"
                min="0"
                max="100"
                step="5"
                value={noteMin}
                onChange={(e) => setNoteMin(Number(e.target.value))}
                style={{ width: "100%" }}
              />
            </FilterField>

            <FilterField label={`${T.priceMaxLabel} · ${prixMax}€`}>
              <input
                type="range"
                min="0"
                max="120"
                step="5"
                value={prixMax}
                onChange={(e) => setPrixMax(Number(e.target.value))}
                style={{ width: "100%" }}
              />
            </FilterField>
          </div>

          <div style={{ marginTop: "18px" }}>
            <span className="pgf-label" style={{ display: "block", marginBottom: "8px" }}>
              {T.platformLabel}
            </span>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              <ToggleChip active={!plateforme} onClick={() => setPlateforme("")} label={T.platformAll} />
              {PLATEFORME_KEYS.map((p) => (
                <ToggleChip
                  key={p}
                  active={plateforme === p}
                  onClick={() => setPlateforme((v) => (v === p ? "" : p))}
                  label={trPlatform(p)}
                />
              ))}
            </div>
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginTop: "18px" }}>
            <ToggleChip active={freeOnly} onClick={() => setFreeOnly((v) => !v)} label={T.freeOnly} />
            <ToggleChip
              active={psPlusOnly}
              onClick={() => setPsPlusOnly((v) => !v)}
              label={T.onPsPlus}
            />
            <ToggleChip
              active={gamePassOnly}
              onClick={() => setGamePassOnly((v) => !v)}
              label={T.onGamePass}
            />
            <ToggleChip
              active={showFavoritesOnly}
              onClick={() => setShowFavoritesOnly((v) => !v)}
              label={`${T.favorites} (${favorites.size})`}
              icon={<Heart size={13} fill={showFavoritesOnly ? "var(--accent)" : "none"} />}
            />
          </div>

          <button className="pgf-btn" onClick={() => handleSearch()} disabled={loading} style={{ marginTop: "20px" }}>
            {loading ? T.searching : (
              <>
                <Search size={18} />
                {T.searchBtn}
              </>
            )}
          </button>
        </div>

        {/* Découverte rapide par genre / mode / thématique */}
        <div style={{ marginTop: "22px" }}>
          <span className="pgf-label" style={{ marginBottom: "12px", display: "block" }}>
            {T.exploreByGenre}
          </span>
          <div className="pgf-tile-grid">
            {TILE_DEFS.map((tile, i) => {
              const Icon = tile.icon;
              const rot = (i % 3) * 6 - 6; // légère variation de rotation du motif décoratif
              return (
                <button
                  key={tile.key}
                  className="pgf-tile"
                  onClick={() => applyTile(tile)}
                  style={{
                    background: `radial-gradient(120% 100% at 100% 0%, ${tile.color}3D 0%, transparent 55%), linear-gradient(165deg, ${tile.color}22, var(--deep) 75%)`,
                    border: `1px solid ${tile.color}40`,
                  }}
                >
                  <Icon
                    size={64}
                    color={tile.color}
                    strokeWidth={1.3}
                    style={{ position: "absolute", top: "10px", right: "-6px", opacity: 0.22, transform: `rotate(${rot}deg)` }}
                  />
                  <div className="pgf-tile-scrim" />
                  <div className="pgf-tile-footer">
                    <div className="pgf-tile-badge" style={{ background: `${tile.color}26`, border: `1px solid ${tile.color}66` }}>
                      <Icon size={14} color={tile.color} />
                    </div>
                    <span style={{ fontSize: "12.5px", fontWeight: 700, color: "var(--text)", lineHeight: 1.15 }}>{trTile(tile.key)}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Résultats */}
        <div style={{ marginTop: "28px" }}>
          {!hasSearched && !loading && (
            <EmptyState
              title={T.readyToSearch}
              text={T.readyToSearchText}
            />
          )}

          {hasSearched && !loading && games.length > 0 && (
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px", flexWrap: "wrap", gap: "10px" }}>
              <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "12px", color: "var(--muted)", letterSpacing: "0.06em" }}>
                {T.gamesFound(games.length)}
              </span>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <ArrowUpDown size={13} color="var(--muted)" />
                <select className="pgf-select pgf-select-sm" value={sortKey} onChange={(e) => setSortKey(e.target.value)}>
                  {SORT_KEYS.map((s) => (
                    <option key={s} value={s}>
                      {trSort(s)}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {loading && (
            <div className="pgf-grid">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="pgf-skeleton" />
              ))}
            </div>
          )}

          {!loading && games.length > 0 && (
            <div className="pgf-grid">
              {games.slice(0, visibleCount).map((game, i) => (
                <GameCard
                  key={game.titre + i}
                  game={game}
                  isFavorite={favorites.has(game.titre)}
                  onToggleFavorite={() => toggleFavorite(game.titre)}
                  lang={lang}
                />
              ))}
            </div>
          )}

          {!loading && games.length > visibleCount && (
            <button
              className="pgf-btn"
              onClick={() => setVisibleCount((v) => v + 30)}
              style={{ marginTop: "16px", maxWidth: "260px" }}
            >
              {T.loadMore} ({games.length - visibleCount})
            </button>
          )}

          {!loading && hasSearched && games.length === 0 && (
            <EmptyState
              title={T.noResults}
              text={T.noResultsText}
            />
          )}
        </div>

        <p style={{ color: "var(--muted-soft)", fontSize: "12px", marginTop: "40px", textAlign: "center" }}>
          {T.footerDisclaimer}
        </p>
      </div>
    </div>
  );
}

function GlobalStyles() {
  return (
    <style>{`
      input[type="range"] {
        -webkit-appearance: none;
        height: 3px;
        border-radius: 2px;
        background: rgba(var(--panel-rgb),0.15);
        outline: none;
      }
      input[type="range"]::-webkit-slider-thumb {
        -webkit-appearance: none;
        width: 16px;
        height: 16px;
        border-radius: 50%;
        background: var(--text);
        border: 3px solid var(--accent);
        cursor: pointer;
        box-shadow: 0 0 8px rgba(var(--accent-rgb),0.6);
      }
      .pgf-panel {
        background: rgba(var(--panel-rgb),0.045);
        border: var(--panel-border);
        backdrop-filter: var(--panel-blur);
        -webkit-backdrop-filter: var(--panel-blur);
        border-radius: var(--radius);
        padding: 22px;
      }
      .pgf-filter-row {
        display: grid;
        grid-template-columns: 1fr;
        gap: 16px;
      }
      @media (min-width: 700px) {
        .pgf-filter-row { grid-template-columns: repeat(3, 1fr); }
      }
      .pgf-label {
        display: block;
        font-family: 'Space Grotesk', sans-serif;
        font-size: 11px;
        letterSpacing: 0.08em;
        text-transform: uppercase;
        color: var(--muted);
        margin-bottom: 8px;
      }
      .pgf-select, .pgf-input {
        background: var(--input-bg);
        border: 1px solid rgba(var(--panel-rgb),0.12);
        color: var(--text);
        border-radius: var(--radius-sm);
        padding: 10px 12px;
        font-family: 'Inter', sans-serif;
        font-size: 14px;
        width: 100%;
        outline: none;
      }
      .pgf-select:focus, .pgf-input:focus { border-color: var(--accent); }
      .pgf-select-sm { width: auto; padding: 6px 10px; font-size: 12px; }
      .pgf-btn {
        background: var(--btn-bg);
        color: var(--btn-text);
        border: var(--btn-border);
        border-radius: var(--radius-btn);
        padding: 13px 20px;
        font-family: var(--font-display), sans-serif;
        font-weight: 700;
        font-size: 15px;
        text-transform: var(--btn-transform);
        letter-spacing: var(--btn-tracking);
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        width: 100%;
        transition: filter 0.15s ease, transform 0.1s ease;
        box-shadow: var(--shadow-btn);
      }
      .pgf-btn:hover:not(:disabled) { filter: brightness(1.08); }
      .pgf-btn:active:not(:disabled) { transform: scale(0.98); }
      .pgf-btn:disabled { opacity: 0.6; cursor: not-allowed; }
      .pgf-tile-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 10px;
      }
      @media (min-width: 560px) {
        .pgf-tile-grid { grid-template-columns: repeat(3, 1fr); }
      }
      @media (min-width: 860px) {
        .pgf-tile-grid { grid-template-columns: repeat(4, 1fr); }
      }
      .pgf-tile {
        position: relative;
        overflow: hidden;
        border-radius: 14px;
        cursor: pointer;
        aspect-ratio: 4 / 3;
        padding: 0;
        transition: transform 0.12s ease;
      }
      .pgf-tile:active { transform: scale(0.96); }
      .pgf-tile-scrim {
        position: absolute;
        inset: 0;
        background: linear-gradient(0deg, rgba(4,6,14,0.88) 0%, rgba(4,6,14,0.25) 55%, transparent 80%);
      }
      .pgf-tile-footer {
        position: absolute;
        left: 10px;
        right: 10px;
        bottom: 9px;
        display: flex;
        align-items: center;
        gap: 7px;
        text-align: left;
      }
      .pgf-tile-badge {
        width: 24px;
        height: 24px;
        border-radius: 7px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
      }
      .pgf-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
        gap: 14px;
      }
      .pgf-card {
        position: relative;
        background: rgba(var(--panel-rgb),0.04);
        border: 1px solid rgba(var(--panel-rgb),0.1);
        border-radius: var(--radius-card);
        box-shadow: var(--shadow-card);
        padding: 18px;
        display: flex;
        flex-direction: column;
        gap: 10px;
      }
      .pgf-skeleton {
        height: 168px;
        border-radius: 2px;
        background: linear-gradient(90deg, rgba(var(--panel-rgb),0.04) 25%, rgba(var(--panel-rgb),0.09) 37%, rgba(var(--panel-rgb),0.04) 63%);
        background-size: 400% 100%;
        animation: pgf-shimmer 1.4s ease infinite;
      }
      @keyframes pgf-shimmer {
        0% { background-position: 100% 0; }
        100% { background-position: -100% 0; }
      }
      .pgf-fav-btn {
        background: transparent;
        border: none;
        cursor: pointer;
        padding: 4px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    `}</style>
  );
}

function FilterField({ label, children }) {
  return (
    <div>
      <span className="pgf-label">{label}</span>
      {children}
    </div>
  );
}

function ToggleChip({ active, onClick, label, icon }) {
  return (
    <button
      onClick={onClick}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "6px",
        border: `1px solid ${active ? "var(--accent)" : "rgba(var(--panel-rgb),0.15)"}`,
        background: active ? "rgba(var(--accent-rgb),0.12)" : "transparent",
        color: active ? "var(--accent)" : "var(--muted)",
        borderRadius: "999px",
        padding: "7px 14px",
        fontSize: "12px",
        fontFamily: "'Inter', sans-serif",
        fontWeight: 600,
        cursor: "pointer",
      }}
    >
      {icon}
      {label}
    </button>
  );
}

function EmptyState({ title, text }) {
  return (
    <div
      style={{
        border: "1px dashed rgba(var(--panel-rgb),0.15)",
        borderRadius: "14px",
        padding: "48px 24px",
        textAlign: "center",
        color: "var(--muted)",
      }}
    >
      <Gamepad2 size={28} color="#3A4270" style={{ marginBottom: "12px" }} />
      <div style={{ fontFamily: "var(--font-display), sans-serif", fontWeight: 700, fontSize: "18px", color: "var(--text-alt)", marginBottom: "4px" }}>
        {title}
      </div>
      <div style={{ fontSize: "13px", maxWidth: "320px", margin: "0 auto" }}>{text}</div>
    </div>
  );
}

function GameCard({ game, isFavorite, onToggleFavorite, lang }) {
  const tier = trophyTier(game.note);
  const genreLabel = I18N[lang].genres[game.genre] ?? game.genre;
  const modeLabel = { "Solo": I18N[lang].modes.solo, "Multijoueur": I18N[lang].modes.multi, "Coopératif": I18N[lang].modes.coop, "Solo/Multi": `${I18N[lang].modes.solo}/${I18N[lang].modes.multi}` }[game.mode] || game.mode;
  const psPlusTier = getPsPlusTier(game.titre);
  const psPlus = psPlusTier ? PSPLUS_STYLE[psPlusTier] : null;
  const onGamePass = isOnGamePass(game.titre);
  const dot = genreDotColor(game.genre);
  return (
    <div className="pgf-card">
      <div style={{ display: "flex", gap: "12px" }}>
        {/* Miniature stylisée (initiales) — pas de vraie jaquette, protégée par le droit d'auteur */}
        <div
          style={{
            width: "52px",
            height: "68px",
            flexShrink: 0,
            borderRadius: "8px",
            background: "rgba(var(--panel-rgb),0.06)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "17px", color: dot }}>
            {initials(game.titre)}
          </span>
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "8px" }}>
            <h3
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 700,
                fontSize: "19px",
                margin: 0,
                lineHeight: 1.25,
              }}
            >
              {game.titre}
            </h3>
            <button
              className="pgf-fav-btn"
              onClick={onToggleFavorite}
              aria-label={I18N[lang].ui.toggleFavoriteLabel}
              style={{ background: "transparent", flexShrink: 0 }}
            >
              <Heart size={16} color={isFavorite ? "var(--accent)" : "var(--muted-soft)"} fill={isFavorite ? "var(--accent)" : "none"} />
            </button>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "6px", marginTop: "3px" }}>
            <span style={{ fontSize: "12px", fontWeight: 600, color: tier.color }}>
              {I18N[lang].ui[tier.key]} · {game.note}
            </span>
            {game.prix === 0 && (
              <span style={{ fontSize: "12px", fontWeight: 600, color: "#59D18C" }}>· {I18N[lang].ui.free}</span>
            )}
          </div>
        </div>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
        <Tag dot={dot}>{genreLabel}</Tag>
        {game.mode && <Tag>{modeLabel}</Tag>}
        {game.annee && <Tag>{game.annee}</Tag>}
        {psPlus && (
          <span
            style={{
              fontSize: "11px",
              fontWeight: 600,
              color: psPlus.color,
              border: `1px solid ${psPlus.color}55`,
              borderRadius: "999px",
              padding: "2px 8px",
            }}
          >
            {psPlus.label}
          </span>
        )}
        {onGamePass && (
          <span
            style={{
              fontSize: "11px",
              fontWeight: 600,
              color: GAMEPASS_STYLE.color,
              border: `1px solid ${GAMEPASS_STYLE.color}55`,
              borderRadius: "999px",
              padding: "2px 8px",
            }}
          >
            {GAMEPASS_STYLE.label}
          </span>
        )}
      </div>

      {game.plateformes && game.plateformes.length > 0 && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
          {game.plateformes.map((p) => (
            <span
              key={p}
              style={{
                fontSize: "10px",
                fontWeight: 600,
                color: PLATEFORME_COLORS[p] || "var(--muted-soft)",
                borderRadius: "999px",
                padding: "1px 7px",
                background: `${PLATEFORME_COLORS[p] || "var(--muted-soft)"}18`,
              }}
            >
              {PLATEFORME_SHORT[p] || p.toUpperCase()}
            </span>
          ))}
        </div>
      )}

      <p style={{ fontSize: "13px", color: "var(--muted-alt)", margin: 0, lineHeight: 1.45 }}>
        {translatedDescription(game, lang)}
      </p>

      {game.prix !== 0 && (
        <div
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "15px",
            fontWeight: 600,
            color: "var(--text)",
          }}
        >
          {game.prix}€
        </div>
      )}
    </div>
  );
}

function Tag({ children, dot }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "5px",
        fontSize: "11px",
        fontFamily: "'Inter', sans-serif",
        fontWeight: 500,
        color: "var(--muted-alt)",
        border: "1px solid rgba(var(--panel-rgb),0.14)",
        borderRadius: "999px",
        padding: "2px 9px",
      }}
    >
      {dot && <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: dot, flexShrink: 0 }} />}
      {children}
    </span>
  );
}
