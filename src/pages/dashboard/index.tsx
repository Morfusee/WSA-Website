import { Container } from "@mui/material";
import welcome_logo from "../../assets/images/welcome.svg";
import logo from "../../assets/images/logo.png";

function Dashboard() {
  return (
    <Container maxWidth="lg" className="flex flex-col gap-4 p-5 overflow-y-auto">
      <WelcomeCard />
      <section className="flex gap-4">
        <StatisticsCard title="Total Number of Tops" value={12} />
        <StatisticsCard title="Total Number of Bottoms" value={12} />
        <StatisticsCard title="Total Number of Undergarments" value={12} />
      </section>
      <CurrentItemsTable />
    </Container>
  );
}

function WelcomeCard() {
  return (
    <section className="flex rounded-md p-6 lg:max-h-48 text-white shadow-sm bg-primary-dark">
      <div className="flex flex-col gap-4 flex-[1_1_80%]">
        <span className="flex flex-col">
          <h1 className="font-bold text-lg">Welcome back,</h1>
          <h2 className="text-gray-300">John Doe</h2>
        </span>
        <span className="flex flex-col gap-2 w-full lg:w-2/3">
          <p className="text-sm text-gray-200">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus,
            doloremque?
          </p>
          <GoButton />
        </span>
      </div>
      <div className="flex-[1_1_30%] hidden lg:block">
        <img src={welcome_logo} alt="Dashboard" className="" />
      </div>
    </section>
  );
}

function StatisticsCard({ title, value }: { title: string; value: number }) {
  return (
    <div className="flex flex-col flex-1 justify-between bg-primary-dark gap-4 rounded-md p-6 text-gray-200 shadow-sm">
      <h1 className="font-semibold">{title}</h1>
      <h2 className="text-3xl">{value}</h2>
    </div>
  );
}

function CurrentItemsTable() {
  return (
    <section className="flex flex-col gap-3.5 p-6 text-white rounded-md shadow-sm bg-primary-dark">
      <h1 className="font-semibold tracking-wide">
        Current Items in the Laundry
      </h1>
      <CurrentItemsCard />
      <CurrentItemsCard />
      <CurrentItemsCard />
    </section>
  );
}

function CurrentItemsCard() {
  return (
    <div className="flex flex-col gap-2">
      <span className="flex px-4 py-2 bg-gray-600 rounded-md items-center gap-4">
        <img
          src={logo}
          alt=""
          className="w-14 h-10 object-contain bg-gray-700 rounded-md"
        />
        <span className="flex flex-col">
          <h1 className="font-semibold">Lorem ipsum dolor sit amet.</h1>
          <p className="text-sm">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquam,
            illo.
          </p>
        </span>
        <GoButton className="ml-auto" />
      </span>
    </div>
  );
}

function GoButton({ className }: { className?: string }) {
  return (
    <button
      className={
        "rounded-md px-4 py-2 w-fit font-semibold text-sm text-white bg-primary-main hover:bg-blue-300 " +
        className
      }
    >
      Go
    </button>
  );
}
export default Dashboard;
