interface DashboardProps {
  children: React.ReactNode;
}

export const Dashboard = ({ children }: DashboardProps) => {
  return (
    <aside className="bg-secondary-bg w-full shrink-0 rounded-[30px] p-5 md:flex md:justify-between md:gap-7 lg:sticky lg:top-4 lg:w-88.25 lg:flex-col xl:gap-5">
      {children}
    </aside>
  );
};
