import {Form} from "@/shared/components/form/form";

export default function HomePage() {
  return (
    <main>
      <div className="mx-auto w-3xl rounded-xl border border-gray-400 p-10">
        <Form label="Enter name" placeholder="Enter your name" />
      </div>
    </main>
  );
}
