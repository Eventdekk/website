import '../App.css'
import Button from './Button.js'

export default function Buttons() {
    return (
        <>
            <section class="text-center p-4">
                <h1 class="text-3xl font-bold">
                    Buttons:
                </h1>
                <div class="mt-2">
                    <Button message="Clicked" style="bg-blue-500">
                        Increment
                    </Button>
                </div>
                <div class="mt-2">
                    <Button message="Clicked" style="bg-red-500 hover:bg-red-700">
                        Increment Red
                    </Button>
                </div>
            </section>
        </>
    );
  }