import SearchHeader from "@/components/SearchHeader";
import SearchSideBar from "@/components/SearchSideBar";

const Loading = async () => {
  return (
    <>
      <SearchHeader city="" />
      <div className="flex py-4 m-auto w-2/3 justify-between items-start">
        <SearchSideBar locations={[]} cuisines={[]} searchParams={{}} />
        <div className="w-5/6">
          <div className="border-b flex flex-col pb-5 ml-4">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((num, i) => {
              return (
                <>
                  <div
                    key={i}
                    className="animate-pulse bg-slate-200 w-44 h-36 m-3 rounded overflow-hidden border cursor-pointer"
                  >
                    &nbsp;
                  </div>

                  <div className="pl-5">
                    <h2 className="text-3xl w-40 animate-pulse bg-slate-200 mb-1">
                      &nbsp;
                    </h2>
                    <div className="flex items-start">
                      <div className="w-20 animate-pulse bg-slate-200  mb-1">
                        &nbsp;
                      </div>
                      <p className="ml-2 text-sm w-30 animate-pulse bg-slate-200  mb-1">
                        &nbsp;
                      </p>
                    </div>
                    <div className="mb-9">
                      <div className="font-light flex text-reg">
                        <div className="w-20 animate-pulse bg-slate-200  mb-1">
                          &nbsp;
                        </div>
                        <div className="w-40 animate-pulse bg-slate-200  mb-1">
                          &nbsp;
                        </div>
                        <div className="w-30 animate-pulse bg-slate-200  mb-1">
                          &nbsp;
                        </div>
                      </div>
                    </div>
                    <div className="text-red-600">
                      <div className="w-40 animate-pulse bg-slate-200 ">
                        &nbsp;
                      </div>
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Loading;
