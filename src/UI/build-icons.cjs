/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');
const path = require('path');
const SVGSpriter = require('svg-sprite');
const consola = require('consola');
const { colorize } = require('consola/utils');

/**
 * Heavily influenced by epic-stack icon generation.
 * https://github.com/epicweb-dev/epic-stack
 */

const SVG_INPUT_FOLDER = 'src/icons';
const SVG_OUTPUT_FOLDER = 'src/components/icon';
const SVG_SPRITE_FILE_NAME = 'svg-sprite';
const SVG_ID_PREFIX = 'icon--';

const ICON_COMPONENT_OUTPUT_FOLDER = SVG_OUTPUT_FOLDER;
const ICON_COMPONENT_FILENAME = 'index.tsx';
const TEMPLATE_FILE_NAME = 'icon-component-template.txt';

const spriterConfig = {
    // https://github.com/svg-sprite/svg-sprite#configuration-basics
    dest: SVG_OUTPUT_FOLDER,
    mode: {
        symbol: {
            bust: false,
            example: false,
            sprite: SVG_SPRITE_FILE_NAME
        }
    },
    shape: {
        id: {
            generator: (filePath, _file) => {
                const parsedPath = path.parse(filePath);
                return SVG_ID_PREFIX + parsedPath.name;
            }
        },
        transform: [
            {
                svgo: {
                    // https://github.com/svg/svgo#configuration
                    plugins: [
                        {
                            name: 'removeAttrs',
                            params: {
                                attrs: 'class'
                            }
                        }
                    ]
                }
            }
        ]
    }
};

consola.start('Building svg-sprite...');

const foundIcons = [];

try {
    const spriter = new SVGSpriter(spriterConfig);
    const svgFiles = getSvgFilesToSprite();
    addSvgToSpriter(svgFiles, spriter);
    spriter.compile(writeSpriteToDisk);
    generateReactIconComponent();
} catch (error) {
    consola.error(error);
}

/**
 * @param {string[]} files
 * @param {SVGSpriter.SVGSpriter} spriter
 */
function addSvgToSpriter(files, spriter) {
    if (files.length === 0) {
        consola.warn();
    }

    for (const file of files) {
        const parsedPath = path.parse(file);
        consola.info(
            `Adding icon ${colorize(
                'greenBright',
                parsedPath.base
            )} to the sprite`
        );
        foundIcons.push(parsedPath.name);
        spriter.add(file, file, fs.readFileSync(file, 'utf8'));
    }
}

/**
 * @param {Error} error
 * @param {Record<string, unknown>} result
 */
function writeSpriteToDisk(error, result) {
    if (error) {
        consola.error(error);
        return;
    }
    const {
        symbol: { sprite }
    } = result;
    fs.writeFileSync(path.join(sprite.base, sprite.basename), sprite.contents);
    consola.success(
        `Generated svg-sprite: ${colorize('greenBright', sprite.basename)}`
    );
}

function generateReactIconComponent() {
    consola.start(
        `'Generating ${colorize(
            'greenBright',
            '`<Icon />`'
        )} react component...'`
    );
    let template = fs.readFileSync(TEMPLATE_FILE_NAME, 'utf8');

    template += `
export type IconName = 
${foundIcons.map((icon) => `  | '${icon}'`).join('\n')}
;`;

    fs.writeFileSync(
        path.join(
            normalizeFolder(ICON_COMPONENT_OUTPUT_FOLDER),
            ICON_COMPONENT_FILENAME
        ),
        template.trim()
    );

    consola.success(
        `Generated ${colorize('greenBright', ICON_COMPONENT_FILENAME)}`
    );
}

function getSvgFilesToSprite() {
    return fs
        .readdirSync(normalizeFolder(SVG_INPUT_FOLDER))
        .filter((file) => file.endsWith('.svg'))
        .map((file) => path.join(SVG_INPUT_FOLDER, file));
}

function normalizeFolder(folder) {
    let fullPath = path.resolve(folder);
    // eslint-disable-next-line no-undef
    let normalized = fullPath.replace(process.cwd(), '').substring(1);
    return normalized;
}
