I am creating a video editor that allows you to edit videos with natural language.
I want to be able to upload a video, edit the video with natural language, and download the edited video.
On the backend, I want to use Hono to create an API that can handle the video processing.
I want to use AI to edit the video. I am thinking of using openai models through the vercel ai sdk to modify the video.
The application will work by uploading a video, entering natural language instructions, and then clicking a button to process the video.
FFmpeg will be used to process the video, the AI will be used to process the natural language into an ffmpeg command that will then be used to edit the video.
FFmpeg.wasm will be used to run the ffmpeg commands in the browser.
