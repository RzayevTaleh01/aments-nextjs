"use client";

import Breadcrumb from "@/components/ui/Breadcrumb/Breadcrumb";
import styles from "./FAQPage.module.scss";

export default function FAQPage() {
  const faqs = [
    {
      id: "item-1",
      q: "Convenient User Interface",
      a: "Donec mattis finibus elit ut tristique. Nullam tempus nunc eget arcu vulputate, eu porttitor tellus commodo. Aliquam erat volutpat. Aliquam consectetur lorem eu viverra lobortis. Morbi gravida, nisi id fringilla ultricies, elit lorem eleifend lorem",
      defaultChecked: true,
    },
    {
      id: "item-2",
      q: "Lorem ipsum dolor sit amet.",
      a: "Donec mattis finibus elit ut tristique. Nullam tempus nunc eget arcu vulputate, eu porttitor tellus commodo. Aliquam erat volutpat. Aliquam consectetur lorem eu viverra lobortis. Morbi gravida, nisi id fringilla ultricies, elit lorem eleifend lorem",
    },
    {
      id: "item-3",
      q: "Aliquid esse atque eveniet fugiat ullam",
      a: "Donec mattis finibus elit ut tristique. Nullam tempus nunc eget arcu vulputate, eu porttitor tellus commodo. Aliquam erat volutpat. Aliquam consectetur lorem eu viverra lobortis. Morbi gravida, nisi id fringilla ultricies, elit lorem eleifend lorem",
    },
    {
      id: "item-4",
      q: "Tenetur, facilis neque error earum facere exercitationem!",
      a: "Donec mattis finibus elit ut tristique. Nullam tempus nunc eget arcu vulputate, eu porttitor tellus commodo. Aliquam erat volutpat. Aliquam consectetur lorem eu viverra lobortis. Morbi gravida, nisi id fringilla ultricies, elit lorem eleifend lorem",
    },
    {
      id: "item-5",
      q: "Perspiciatis ut ipsa cum molestias quaerat laborum.",
      a: "Donec mattis finibus elit ut tristique. Nullam tempus nunc eget arcu vulputate, eu porttitor tellus commodo. Aliquam erat volutpat. Aliquam consectetur lorem eu viverra lobortis. Morbi gravida, nisi id fringilla ultricies, elit lorem eleifend lorem",
    },
    {
      id: "item-6",
      q: "Responsive Design",
      a: "Donec mattis finibus elit ut tristique. Nullam tempus nunc eget arcu vulputate, eu porttitor tellus commodo. Aliquam erat volutpat. Aliquam consectetur lorem eu viverra lobortis. Morbi gravida, nisi id fringilla ultricies, elit lorem eleifend lorem",
    },
  ];

  return (
    <div className={styles.scope}>
      <Breadcrumb title="FAQ" items={[{ label: "Home", href: "/" }, { label: "FAQ" }]} />

      <div className="faq-section">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="faq-content">
                <h5>Below are frequently asked questions, you may find the answer for yourself</h5>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec id erat sagittis, faucibus metus malesuada, eleifend turpis. Mauris semper augue id nisl aliquet, a porta lectus mattis. Nulla at tortor augue. In eget enim diam. Donec gravida tortor sem, ac fermentum nibh rutrum sit amet. Nulla convallis mauris vitae congue consequat. Donec interdum nunc purus, vitae vulputate arcu fringilla quis. Vivamus iaculis euismod dui.
                </p>
              </div>
            </div>
          </div>
          <div className="faq-wrapper">
            <div className="row">
              <div className="col-12">
                <div className="faq-accordian">
                  {faqs.map((item) => (
                    <div key={item.id} className="faq-accordian-single-item">
                      <input id={item.id} name="accordian-item" type="radio" defaultChecked={item.defaultChecked} />
                      <label htmlFor={item.id}>{item.q}</label>
                      <div className="item-content">
                        <p>{item.a}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
