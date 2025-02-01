import 'server-only';

import { ProductProps } from "@/components/Product";

export type Product = ProductProps & {
  id: number;
};

export const data: Product[] = [
  {
    id: 0,
    alt: "shoes",
    photo: "/shoes.png",
    title: "Shoes",
    desc: "Nice and comfortable shoes for you",
    cost: 100,
  },
  {
    id: 1,
    alt: "jacket",
    photo: "/jacket.png",
    title: "Jacket",
    desc: "Nice and comfortable jackets for you",
    cost: 1000,
  },
  {
    id: 2,
    alt: "hat",
    photo: "/hat.png",
    title: "Hat",
    desc: "Nice and comfortable hat for you",
    cost: 100,
  },
  {
    id: 3,
    alt: "tshirt",
    photo: "/tshirt.png",
    title: "Red T-Shirt",
    desc: "Nice and comfortable red T-Shirt for you",
    cost: 300,
  },
  {
    id: 4,
    alt: "slipper",
    photo: "/slipper.png",
    title: "Slipper",
    desc: "Nice and comfortable slipper for you",
    cost: 200,
  },
  {
    id: 5,
    alt: "jjk-cd",
    photo: "/jjk.png",
    title: "JJK CD",
    desc: "Full JJK CD set for you",
    cost: 500,
  },
  {
    id: 6,
    alt: "violin",
    photo: "/violin.jpg",
    title: "Violin",
    desc: "Nice and strong violin for you",
    cost: 2000,
  },
  {
    id: 7,
    alt: "bonsai",
    photo: "/bonsai.png",
    title: "Bonsai",
    desc: "Nice and beautiful bonsai plant for you",
    cost: 5000,
  },
  {
    id: 8,
    alt: "airpods",
    photo: "/airpods.jpeg",
    title: "Airpods",
    desc: "Nice and durable airpods for you",
    cost: 600,
  },
];
