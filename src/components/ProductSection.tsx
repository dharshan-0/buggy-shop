import { Product } from "./Product";

import { data } from "../../data";

export function ProductSection() {
  return data.map((p) => (
    <Product
      key={p.id}
      alt={p.alt}
      photo={p.photo}
      cost={p.cost}
      title={p.title}
      desc={p.desc}
    />
  ));
}
