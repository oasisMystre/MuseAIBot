import clsx from "clsx";
import { useState } from "react";
import { toast } from "react-toastify";
import { MdMusicNote, MdQuestionMark } from "react-icons/md";

import { object, string, boolean, array } from "yup";
import { ErrorMessage, Field, Form, Formik } from "formik";

import { genres } from "../../config/genre";
import IcRandom from "../../assets/ic_random";
import { shuffleArray } from "../../lib/utils/object";

import { useAppDispatch } from "../../store";
import { libraryActions } from "../../store/slices/librarySlice";

import { useApi } from "../../composables/useApi";
import useMusicDialog from "../../composables/useMusicDialog";

import CheckBox from "../../components/elements/CheckBox";
import ChipInput from "../../components/elements/ChipInput";

let _genres = shuffleArray(genres).slice(0, 4);

export default function CreatePage() {
  const api = useApi();
  const dispatch = useAppDispatch();
  const { setLibrary } = useMusicDialog();

  const [lyricsLoading, setLyricsLoading] = useState(false);

  const validateYupSchema = object().shape({
    customMode: boolean(),
    instrumental: boolean(),
    prompt: string().trim().min(6).required(),
    title: string()
      .trim()
      .min(5)
      .when("isCustom", {
        is: true,
        then: () => string().required(),
        otherwise: () => string().notRequired(),
      }),
    tags: array(string()).optional(),
  });

  return (
    <>
      <main className="flex-1 flex flex-col">
        <main className="flex flex-col space-y-8 p-4 md:self-center md:min-w-xl">
          <Formik
            validationSchema={validateYupSchema}
            initialValues={{
              prompt: "",
              title: "",
              customMode: false,
              instrumental: false,
              tags: [] as string[],
            }}
            onSubmit={async (values, { setSubmitting }) => {
              await toast.promise(
                api.library
                  .createAndWaitForLibrary(values)
                  .then((data) => {
                    setLibrary(data);
                    dispatch(libraryActions.addMany([data]));
                  })
                  .catch((error) => {
                    console.log(error);
                    return Promise.reject(error);
                  })
                  .finally(() => setSubmitting(true)),
                {
                  pending: "Generating music, please wait a moment.",
                  success: "Music generated succesfully.",
                  error: "Unable to process music generation.",
                },
              );
            }}
          >
            {({ isSubmitting, setFieldValue, values }) => (
              <>
                <header className="flex items-center">
                  <h1 className="flex-1 text-xl font-bold">Create</h1>
                  <CheckBox name="customMode">
                    <span>Custom Prompt</span>
                  </CheckBox>
                </header>
                <Form className="flex flex-col space-y-8">
                  <div className="flex-1 flex flex-col space-y-4">
                    {values.customMode && (
                      <div className="flex flex-col space-y-2">
                        <label className="flex items-center space-x-2">
                          <span>Title</span>
                          <MdQuestionMark />
                        </label>
                        <Field
                          name="title"
                          className="input-border focus:input-focus"
                          placeholder="Enter a title"
                        />
                        <small className="text-red-500 first-letter:capitalize">
                          <ErrorMessage name="title" />
                        </small>
                      </div>
                    )}
                    <div className="flex flex-col space-y-2">
                      <label className="text-sm">
                        {values.customMode ? "Lyrics" : "Song Description"}
                      </label>
                      <div className="flex flex-col input-border focus-within:input-focus">
                        <Field
                          as="textarea"
                          name="prompt"
                          className={clsx(
                            "flex-1 bg-transparent focus:outline-none",
                            { "min-h-30": values.customMode },
                          )}
                          placeholder={
                            values.customMode
                              ? "Enter your own lyrics..."
                              : "Song Description"
                          }
                        />
                        {values.customMode && (
                          <button
                            type="button"
                            className="min-w-48 h-10 self-start flex space-x-2 justify-center items-center !bg-stone-700 px-2 py-1 rounded-md cursor-pointer"
                            disabled={lyricsLoading}
                            onClick={async () => {
                              setLyricsLoading(true);

                              await toast
                                .promise(
                                  api.micellenousApi
                                    .generateLyrics("Generate random lyrics")
                                    .then(({ data }) => {
                                      if (data.length > 0) {
                                        const [lyric] = data;
                                        setFieldValue("title", lyric.title);
                                        setFieldValue("prompt", lyric.text);

                                        return;
                                      }

                                      return Promise.reject();
                                    }),
                                  {
                                    pending: "Generating lyrics",
                                    success: "Lyrics generated successfully",
                                    error: "An unexpected error ocurr",
                                  },
                                )
                                .finally(() => setLyricsLoading(false));
                            }}
                          >
                            {lyricsLoading ? (
                              <div className="w-6 h-6 border-3 border-t-transparent rounded-full animate-spin" />
                            ) : (
                              <>
                                <IcRandom className="text-xl" />
                                <span>Make random Lyrics</span>
                              </>
                            )}
                          </button>
                        )}
                      </div>
                      <small className="text-red-500 first-letter:capitalize">
                        <ErrorMessage name="prompt" />
                      </small>
                    </div>
                    {values.customMode && (
                      <ChipInput
                        name="tags"
                        label="Song Genre"
                        placeholder="Enter music genre"
                      >
                        <div className="flex space-x-2 items-center flex-nowrap overflow-x-scroll">
                          {_genres.map((genre, index) => (
                            <button
                              key={index}
                              type="button"
                              className="shrink-0 border border-white/50 rounded px-2 py-1 text-sm text-white/80"
                              onClick={() => {
                                if (!values.tags.includes(genre))
                                  setFieldValue(
                                    "tags",
                                    values.tags.concat(genre),
                                  );
                              }}
                            >
                              {genre}
                            </button>
                          ))}
                        </div>
                      </ChipInput>
                    )}
                    <CheckBox name="instrumental">
                      <span>Instrumental</span>
                    </CheckBox>
                  </div>
                  <button
                    disabled={isSubmitting}
                    className="flex items-center justify-center bg-white text-black py-2 rounded-md hover:bg-green-white/80 active:bg-white"
                  >
                    {isSubmitting ? (
                      <div className="w-6 h-6 border-3 border-t-transparent border-black rounded-full animate-spin" />
                    ) : (
                      <div className="flex space-x-2 items-center justify-center">
                        <span>Create</span>
                        <MdMusicNote className="text-xl" />
                      </div>
                    )}
                  </button>
                </Form>
              </>
            )}
          </Formik>
        </main>
      </main>
    </>
  );
}
