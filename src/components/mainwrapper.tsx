type MainWrapperProps = {
  children: React.ReactNode;
};

export const MainWrapper = ({ children }: MainWrapperProps) => {
  return (
    <main className="flex flex-col items-center gap-3 p-5 my-5 h-screen">
      {children}
    </main>
  );
};
