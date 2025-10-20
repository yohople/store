"use client" 
import React from "react";
import { faker } from "@faker-js/faker";
import FormInput from "@/components/form/FormInput";
import FormContainer from "@/components/form/FormContainer";
import { createProduct } from "@/utils/action";
import PriceInput from "@/components/form/PriceInput";
import ImageInput from "@/components/form/ImageInput";
import TextAreaInput from "@/components/form/TextAreaInput";
import CheckBoxInput from "@/components/form/CheckBoxInput";
import { SubmitButton } from "@/components/form/Buttons";

function CreateProductPage() {
  const name = faker.commerce.productName();
  const company = faker.company.name();
  const description = faker.lorem.paragraph({ min: 10, max: 12 });
  return (
    <section>
      <h1 className="text-2xl font-semibold mb-8 capitalize">create product</h1>
      <div className="border p-8 rounded-md">
        <FormContainer action={createProduct}>
          <div className="grid gap-4 md:grid-cols-2 my-4">
            <FormInput
              name="name"
              type="text"
              defaultValue={name}
              label="Product Name"
            />
            <FormInput
              name="company"
              type="text"
              defaultValue={company}
              label="company"
            />
            <PriceInput />
            <ImageInput />
          </div>
          <TextAreaInput name="description" labelText="product description" defaultValue={description}/>
          <div className="mt-6">
            <CheckBoxInput name="featured" label="featured"/>
            <SubmitButton text="create product" className="mt-8"/>
          </div>
        </FormContainer>
      </div>
    </section>
  );
}

export default CreateProductPage;
