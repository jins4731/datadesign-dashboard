const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="border-dashed border-2 border-gray-300 rounded-xl px-4 py-3 sm:px-6 lg:px-8">
      {children}
    </div>
  )
}

export default Container;
