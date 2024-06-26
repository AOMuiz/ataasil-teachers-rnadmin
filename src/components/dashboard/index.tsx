import Image from "next/image";

export const Dashboard = () => (
  <div className="p-10">
    <div className="space-y-3">
      <h2 className="font-bold text-3xl">لوحة القيادة</h2>
      <p className="text-[#5A5A5A]">
        لست مسجلًا في أي برنامج تدريبي حتى الآن. بإمكانك الاختيار من قائمة
        البرامج التدريبية أدناه، المقترحة لك حسب اهتماماتك.
      </p>
    </div>

    <section className="my-5 flex justify-between items-center gap-10">
      <article className="card bg-base-100 shadow-xl flex-1 ">
        <div className="card-body items-center gap-4">
          <Image src={"/svg/Group 93.svg"} alt="" height={54} width={54} />
          <p className="text-[#AFAFAF] text-sm">مجموع الطلاب</p>
          <p className="text-[#2499E3] text-lg">2,251</p>
        </div>
      </article>
      <article className="card bg-base-100 shadow-xl flex-1 ">
        <div className="card-body items-center gap-4">
          <Image src={"/svg/Group 93(2).svg"} alt="" height={54} width={54} />
          <p className="text-[#AFAFAF] text-sm">الطلاب المعتمدين</p>
          <p className="text-[#2499E3] text-lg">251</p>
        </div>
      </article>
      <article className="card bg-base-100 shadow-xl flex-1 ">
        <div className="card-body items-center gap-4">
          <Image src={"/svg/Group 93(1).svg"} alt="" height={54} width={54} />
          <p className="text-[#AFAFAF] text-sm">إجمالي الدورة</p>
          <p className="text-[#2499E3] text-lg">51</p>
        </div>
      </article>
      <article className="card bg-base-100 shadow-xl flex-1 ">
        <div className="card-body items-center gap-4">
          <Image src={"/svg/Group 93(3).svg"} alt="" height={54} width={54} />
          <p className="text-[#AFAFAF] text-sm">مجموع الطلاب</p>
          <p className="text-[#2499E3] text-lg">2,251</p>
        </div>
      </article>
    </section>
  </div>
);
