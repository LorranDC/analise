<?php

namespace Source;

use Intervention\Image\ImageManagerStatic as Image;

/**
 * Classe de interface com a biblioteca Intervention\Image.
 * Esta classe substitui as operações com imagem que usavam a versão descontinuada da WideImage, atualizada pela última vez em 2015: https://packagist.org/packages/spekkionu/wideimage
 * O código desta classe não condiz com as diretrizes de código utilizadas ao longo do projeto samar-2.0 porque o * projeto samar-2.0 foi produzido antes de eu adotar as diretrizes das PSR-12.
 * Recomenda-se utilizar as diretrizes da PSR-12 e, aos poucos, adequar completamente este projeto a elas.
 * https://www.php-fig.org/psr/psr-12/
 * 
 * 
 */
class ImageFile
{

    /**
     * @var array $dirs Array with all relevant directories:
     * `full_path` path to output images
     * `minis_path` path to output miniature images
     * `watermark_path` path to watermark image
     */
    private array $dirs = [
        'full_path' => 'assets/images/full/',
        'minis_path' => 'assets/images/mini/',
        'watermark_path' => 'assets/images/watermark.png'
    ];

    private array $miniatures = [
        [
            'width' => 354,
            'height' => 236,
            'method' => 'blur'
        ],
        [
            'width' => 273,
            'height' => 182,
            'method' => 'resize'
        ],
        [
            'width' => 150,
            'height' => 150,
            'method' => 'fit'
        ],
        [
            'width' => 50,
            'height' => 50,
            'method' => 'fit'
        ]
    ];

    /**
     * @param array $dirs Array with all relevant directories:
     * 	`full_path` path to output images;
     * 	`minis_path` path to output miniature images;
     * 	`watermark_path` path to watermark image;
     */
    public function __construct(array $dirs)
    {
        $this->dirs = array_combine(array_keys($this->dirs), $dirs);
        $dirs       = $this->dirs;
        if (!is_dir($dirs['minis_path'])) {
            mkdir($dirs['minis_path'], 0777, true);
        }
        foreach ($this->getMinisDimensions() as $dimension) {
            $miniDir = $dirs['minis_path'] . $dimension . "/";
            if (!is_dir($miniDir)) {
                if (!mkdir($miniDir, 0777, true)) {
                    error_log("Falha ao criar diretório de miniaturas: $miniDir");
                } else {
                    error_log("Diretório de miniaturas criado com sucesso: $miniDir");
                }
            }
        }
    }

    /**
     * Gets the number of miniatures as well as their dimentions.
     * @return array an array with width and height of each desired miniature.
     * Should be edited by dev to set the dimentions desired for the project.
     */
    function getMiniatures()
    {
        return $this->miniatures;
    }

    function setMiniatures(array $miniatures)
    {
        $this->miniatures = $miniatures;
    }

    function getMinisDimensions(): array
    {
        foreach ($this->getMiniatures() as $mini) {
            $dimensions[] = "{$mini['width']}x{$mini['height']}";
        }

        return $dimensions;
    }

    /**
     * Creates the miniatures for an image file, based on a given name and on specified dimensions.
     * Uses the `getMiniatures()` method to define how many miniatures will be generated and create them based on their dimensions.
     * Please refer to `getMiniatures` and edit it to define all needed miniatures.
     * Always outputs jpg files.
     */
    function makeMiniatures(string $file, string $miniDir)
    {
        $path     = pathinfo($file);
        $fileName = $path['filename'];

        $minis = $this->getMiniatures();

        foreach ($minis as $mini) {
            $dimensionPath = $miniDir . $mini['width'] . "x" . $mini['height'] . "/";

            if (!is_dir($dimensionPath)) {
                mkdir($dimensionPath, 0777, true);
            }

            $miniature = match ($mini['method']) {
                'fit' => Image::make($file)->fit($mini['width'], $mini['height']),
                'resize' => Image::make($file)->resize($mini['width'], $mini['height'], function ($constraint) {
                    $constraint->aspectRatio();
                    $constraint->upsize();
                }),
                'blur' => $this->blurImage($file, $mini['width'], $mini['height']),
                default => Image::make($file)->resize($mini['width'], $mini['height'], function ($constraint) {
                    $constraint->aspectRatio();
                    $constraint->upsize();
                })
            };

            // Aplica marca d'água no centro da miniatura
            if (!empty($this->dirs['watermark_path']) && file_exists($this->dirs['watermark_path'])) {
                $watermark = Image::make($this->dirs['watermark_path']);
                $watermarkWidth = $miniature->width() * 0.3;

                $watermark->resize($watermarkWidth, null, function ($constraint) {
                    $constraint->aspectRatio();
                    $constraint->upsize();
                });

                $miniature->insert($watermark, 'center');
            }

            $miniPath = $dimensionPath . $fileName . ".webp";

            if ($miniature->save($miniPath, 80, 'webp')) {
                error_log("Miniatura salva com sucesso: $miniPath");
            } else {
                error_log("Erro ao salvar miniatura: $miniPath");
            }
        }
    }



    function blurImage($sourcePath, $frameWidth = 354, $frameHeight = 236)
    {

        // Load the original image
        $image = Image::make($sourcePath);

        // Create a new empty canvas for the final image
        $finalImage = Image::canvas($frameWidth, $frameHeight);

        // Clone the original image
        $blurredImage = clone $image;

        // Resize the cloned image to fit the frame (keeping aspect ratio)
        $blurredImage->fit($frameWidth, $frameHeight);

        // Apply the blur effect to the cloned image
        $blurredImage->blur(50);

        // Insert the blurred and resized clone into the canvas
        $finalImage->insert($blurredImage, 'center');

        $image->resize($frameWidth, $frameHeight, function ($constraint) {
            $constraint->aspectRatio();
            $constraint->upsize();
        });

        // Insert the original image over the blurred clone with keeping aspect ratio
        $finalImage->insert($image, 'center');

        // Return the final image (don't forget to save it to final path)
        return $finalImage;
    }

    /**
     * Creates name, output directory and output file for specific image.
     * Adds watermark to image and creates miniatures.
     * @param string $name
     * @param string $tmp_name
     */
    function processSingleFile(string $name, string $tmp_name, int $imovelID)
    {
        $fullDir = $this->dirs['full_path'];
        $miniDir = $this->dirs['minis_path'];

        if (!is_dir($fullDir)) {
            mkdir($fullDir, 0777, true);
        }

        $fileBaseName = pathinfo($name, PATHINFO_FILENAME);
        $novoNome = "foto-" . time() . "-imovel-" . $imovelID . ".webp";
        $caminhoCompleto = $fullDir . $novoNome;

        if (!move_uploaded_file($tmp_name, $caminhoCompleto)) {
            error_log("Falha ao mover o arquivo: $name para $caminhoCompleto");
            return false;
        }

        try {
            $image = Image::make($caminhoCompleto);

            // Corrige rotação da imagem (EXIF)
            if (function_exists('exif_read_data') && @exif_imagetype($caminhoCompleto) === IMAGETYPE_JPEG) {
                $exif = @exif_read_data($caminhoCompleto);
                if (!empty($exif['Orientation'])) {
                    switch ($exif['Orientation']) {
                        case 3:
                            $image->rotate(180);
                            break;
                        case 6:
                            $image->rotate(-90);
                            break;
                        case 8:
                            $image->rotate(90);
                            break;
                    }
                }
            }

            // Redimensiona imagem base
            $image->resize(1920, null, function ($constraint) {
                $constraint->aspectRatio();
                $constraint->upsize();
            });

            // Aplica marca d'água no centro
            if (!empty($this->dirs['watermark_path']) && file_exists($this->dirs['watermark_path'])) {
                $watermark = Image::make($this->dirs['watermark_path']);
                $watermarkWidth = $image->width() * 0.3;

                $watermark->resize($watermarkWidth, null, function ($constraint) {
                    $constraint->aspectRatio();
                    $constraint->upsize();
                });

                $image->insert($watermark, 'center');
            }

            // Salva imagem final
            $image->save($caminhoCompleto, 80, 'webp');

            // Gera miniaturas (sem aplicar marca d’água novamente)
            $this->makeMiniatures($caminhoCompleto, $miniDir);

            return $novoNome;
        } catch (\Exception $e) {
            error_log("Erro ao processar imagem $name: " . $e->getMessage());
            return false;
        }
    }









    /**
     * Loops through all files and process each one separately.
     * Call it via
     * `$yourObject->processAllFiles($_FILES["your_file_form_element"]);`
     * @param array
     */
    function processAllFiles(array $files, int $imovelID): void
    {
        $fullDir = $this->dirs['full_path'];
        $miniDir = $this->dirs['minis_path'];

        if (!is_dir($fullDir)) {
            mkdir($fullDir, 0777, true);
        }

        foreach ($files["tmp_name"] as $index => $tmp_name) {
            $name = $files["name"][$index];

            if (empty($tmp_name)) {
                error_log("Arquivo {$name} não foi enviado corretamente.");
                continue;
            }

            $novoNome = $this->processSingleFile($name, $tmp_name, $imovelID);
            if ($novoNome) {
                error_log("Imagem {$novoNome} processada com sucesso.");
            } else {
                error_log("Erro ao processar imagem {$name}.");
            }
        }
    }

    function generateBlurImages(int $from, int $to)
    {
        $files = [];
        $property = $from;
        for ($i = 0; $i <= $to - $from; $i++) {
            if (is_dir(IMG_DIR . "/{$property}")) {
                $files[$i] = glob(IMG_DIR . "/{$property}/*.{jpeg, JPG}", GLOB_BRACE);
                $this->createBlurredFiles($files[$i], $property);
                echo "[" . date("Y/m/d - H:i:s") . "] finished <b>{$property}</b> <br><br>";
            }
            $property++;
        }
    }

    function createBlurredFiles(array $files, $code = null)
    {

        for ($i = 0; $i < count($files); $i++) {
            $pathinfo = pathinfo($files[$i]);
            // dd($pathinfo);
            $name     = $pathinfo["basename"];
            $tmp_name = $files[$i];
            $code ??= $this->getCodeFromFileName($name);

            $targetImagePath = "assets/images/output/{$code}/miniaturas/354x236/";
            $this->createDirIfNotExists($targetImagePath);
            try {
                $img = $this->blurImage($tmp_name);
            } catch (\Throwable $th) {
                echo "[" . date("Y/m/d - H:i:s") . "] tried {$name} <br>";
                echo "<h1>Error: </h1>
                {$th}
                <h2>On file:</h2>
                <h3>{$tmp_name}</h3>";
                continue;
            }
            $img->save($targetImagePath . $name);
            echo "[" . date("Y/m/d - H:i:s") . "] saved {$name} <br>";
        }
        // Usage example

    }

    function getCodeFromFileName(string $fileName): string
    {
        $file = pathinfo($fileName)['filename'];
        // Split name-of-the-file with "-" as separator and retrieve last element
        $array = explode("-", $file);
        $code = end($array);

        return $code;
    }

    function createDirIfNotExists($path)
    {
        if (! is_dir($path)) {
            mkdir($path, 0777, true);
        }
    }

    /**
     * Cleans the filename to a url-like name. For example: "My Sweet Puppy" becomes "my-sweet-puppy".
     * Should be called without the file extension. If needed, use `pathinfo($yourVar)['filename']` when calling this function.
     * e.g. `sanitizeName(pathinfo($yourVar)['filename'])`. You should split this line into smaller snippets to make your code more organized and readable.
     * @param string
     * @return string the cleaned filename.
     */
    function sanitizeName(string $name): string
    {
        $str = strtolower($name);
        $str = htmlspecialchars($str);
        $str = preg_replace('/[áãàäâª]/u', 'a', $str);
        $str = preg_replace('/[éèêë]/u', 'e', $str);
        $str = preg_replace('/[íìîï]/u', 'i', $str);
        $str = preg_replace('/[óòôõöº°]/u', 'o', $str);
        $str = preg_replace('/[úùûü]/u', 'u', $str);
        $str = preg_replace('/[ç]/u', 'c', $str);
        $str = preg_replace('/[\/\\\;\:\(\)\*\&\%\$\#\@\!\=\+\.\,\?\>\<]/u', '', $str);
        $str = str_replace(' ', '-', $str);
        $str = str_replace('_', '-', $str);
        $str = str_replace('---', '-', $str);
        $str = str_replace('--', '-', $str);
        $str = html_entity_decode($str);
        return $str;
    }
}

// End of File
