import NotFoundImg from "@/assets/images/not-found.svg";
const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-3">
      <img src={NotFoundImg} alt="img-not-found" width={221} height={174} />
      <p className="text-2xl font-semibold">Empty Todo...</p>
    </div>
  );
};

export default NotFound;
