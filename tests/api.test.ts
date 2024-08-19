import {getUserLibrariesCountToday} from "../src/modules/library/library.controller";

const main = async () => {
    console.log(await getUserLibrariesCountToday("9425"));
}

main()