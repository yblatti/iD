import {
    event as d3_event,
    select as d3_select
} from 'd3-selection';

import { d3keybinding as d3_keybinding } from '../lib/d3.keybinding.js';

import marked from 'marked';
import { t, textDirection } from '../util/locale';
import { svgIcon } from '../svg';
import { uiIntro } from './intro';
import { uiShortcuts } from './shortcuts';
import { uiTooltipHtml } from './tooltipHtml';
import { tooltip } from '../util/tooltip';

import { icon } from 'intro/helper';

export function uiHelp(context) {
    var key = t('help.key');

    var docKeys = [
        ['help', [
            'welcome',
            'open_data_h',
            'open_data',
            'before_start_h',
            'before_start',
            'open_source_h',
            'open_source',
            'open_source_help'
        ]],
        ['overview', [
            'navigation_h',
            'navigation_drag',
            'navigation_zoom',
            'features_h',
            'features',
            'nodes_ways'
        ]],
        ['editing', [
            'select_h',
            'select_left_click',
            'select_right_click',
            'multiselect_h',
            'multiselect_shift_click',
            'multiselect_lasso',
            'undo_redo_h',
            'undo_redo',
            'save_h',
            'save',
            'save_validation',
            'upload_h',
            'upload',
            'backups_h',
            'backups',
            'keyboard_h',
            'keyboard'
        ]],
        ['feature_editor', [
            'intro',
            'definitions',
            'type_h',
            'type',
            'type_picker',
            'fields_h',
            'fields_all_fields',
            'fields_example',
            'fields_add_field',
            'tags_h',
            'tags_all_tags',
            'tags_resources'
        ]],
        ['points', [
            'intro',
            'add_point_h',
            'add_point',
            'add_point_finish',
            'move_point_h',
            'move_point',
            'delete_point_h',
            'delete_point',
            'delete_point_command'
        ]],
        ['lines', [
            'intro',
            'add_line_h',
            'add_line',
            'add_line_draw',
            'add_line_finish',
            'modify_line_h',
            'modify_line_dragnode',
            'modify_line_addnode',
            'connect_line_h',
            'connect_line',
            'connect_line_display',
            'connect_line_drag',
            'connect_line_tag',
            'disconnect_line_h',
            'disconnect_line_command',
            'move_line_h',
            'move_line_command',
            'move_line_connected',
            'delete_line_h',
            'delete_line',
            'delete_line_command'
        ]],
        ['areas', [
            'intro',
            'point_or_area_h',
            'point_or_area',
            'add_area_h',
            'add_area_command',
            'add_area_draw',
            'add_area_finish',
            'square_area_h',
            'square_area_command',
            'modify_area_h',
            'modify_area_dragnode',
            'modify_area_addnode',
            'delete_area_h',
            'delete_area',
            'delete_area_command'
        ]],
        ['relations', [
            'intro',
            'edit_relation_h',
            'edit_relation',
            'edit_relation_add',
            'edit_relation_delete',
            'maintain_relation_h',
            'maintain_relation',
            'relation_types_h',
            'multipolygon_h',
            'multipolygon',
            'multipolygon_create',
            'multipolygon_merge',
            'turn_restriction_h',
            'turn_restriction',
            'turn_restriction_field',
            'turn_restriction_editing',
            'route_h',
            'route',
            'route_add',
            'boundary_h',
            'boundary',
            'boundary_add'
        ]],
        ['imagery', [
            'intro',
            'choosing',
            'sources_h',
            'sources',
            'offsets_h',
            'offset',
            'offset_change'
        ]],
        ['streetlevel', [
            'intro',
            'using_h',
            'using',
            'photos',
            'viewer'
        ]],
        ['gps', [
            'intro',
            'survey',
            'using_h',
            'using',
            'tracing',
            'upload'
        ]]
    ];

    var replacements = {
        more: icon('#icon-more', 'pre-text'),
        apply: icon('#icon-apply', 'pre-text'),
        alert: icon('#icon-alert', 'pre-text'),
        avatar: icon('#icon-avatar', 'pre-text'),
        forward: icon('#icon-forward', 'pre-text'),
        backward: icon('#icon-backward', 'pre-text'),
        fullscreen: icon('#icon-full-screen', 'pre-text'),
        collapsescreen: icon('#icon-collapse-screen', 'pre-text'),
        geolocate: icon('#icon-geolocate', 'pre-text'),
        load: icon('#icon-load', 'pre-text'),
        search: icon('#icon-search', 'pre-text'),
        bug: icon('#icon-bug', 'pre-text'),
        point: icon('#icon-point', 'pre-text'),
        line: icon('#icon-line', 'pre-text'),
        area: icon('#icon-area', 'pre-text'),
        help: icon('#icon-help', 'pre-text'),
        plus: icon('#icon-plus', 'pre-text'),
        minus: icon('#icon-minus', 'pre-text'),
        nearby: icon('#icon-nearby', 'pre-text'),
        outlink: icon('#icon-out-link', 'pre-text'),
        relation: icon('#icon-relation', 'pre-text'),
        translate: icon('#icon-translate', 'pre-text'),
        circularize: icon('#operation-circularize', 'pre-text'),
        orthogonalize: icon('#operation-orthogonalize', 'pre-text'),
        split: icon('#operation-split', 'pre-text'),
        reflect_long: icon('#operation-reflect-long', 'pre-text'),
        reflect_short: icon('#operation-reflect-short', 'pre-text'),
        simplify: icon('#operation-simplify', 'pre-text'),
        smooth: icon('#operation-smooth', 'pre-text'),
        straighten: icon('#operation-straighten', 'pre-text'),
        rotate: icon('#operation-rotate', 'pre-text'),
        reverse: icon('#operation-reverse', 'pre-text'),
        continue: icon('#operation-continue', 'pre-text'),
        disconnect: icon('#operation-disconnect', 'pre-text'),
        layers: icon('#icon-layers', 'pre-text'),
        vertex: icon('#icon-vertex', 'pre-text'),
        data: icon('#icon-data', 'pre-text'),
        down: icon('#icon-down', 'pre-text'),
        up: icon('#icon-up', 'pre-text'),
        inspect: icon('#icon-inspect', 'pre-text'),
        move: icon('#operation-move', 'pre-text'),
        merge: icon('#operation-merge', 'pre-text'),
        copy: icon('#operation-copy', 'pre-text'),
        paste: icon('#operation-paste', 'pre-text'),
        delete: icon('#operation-delete', 'pre-text'),
        close: icon('#icon-close', 'pre-text'),
        undo: icon(textDirection === 'rtl' ? '#icon-redo' : '#icon-undo', 'pre-text'),
        redo: icon(textDirection === 'rtl' ? '#icon-undo' : '#icon-redo', 'pre-text'),
        save: icon('#icon-save', 'pre-text'),
        version: context.version
    };

    // For each section, squash all the texts into a single markdown document
    var docs = docKeys.map(function(key) {
        var tkey = 'help.' + key[0];
        var title = t(tkey + '.title');
        var text = key[1].reduce(function(all, part) {
            return all + t(tkey + '.' + part, replacements) + '\n\n';
        }, '');

        return {
            title: title,
            html: marked(text.trim())
        };
    });


    function help(selection) {

        function hide() {
            setVisible(false);
        }


        function toggle() {
            if (d3_event) d3_event.preventDefault();
            tooltipBehavior.hide(button);
            setVisible(!button.classed('active'));
        }


        function setVisible(show) {
            if (show !== shown) {
                button.classed('active', show);
                shown = show;

                if (show) {
                    selection.on('mousedown.help-inside', function() {
                        return d3_event.stopPropagation();
                    });
                    pane.style('display', 'block')
                        .style('right', '-500px')
                        .transition()
                        .duration(200)
                        .style('right', '0px');
                } else {
                    pane.style('right', '0px')
                        .transition()
                        .duration(200)
                        .style('right', '-500px')
                        .on('end', function() {
                            d3_select(this).style('display', 'none');
                        });
                    selection.on('mousedown.help-inside', null);
                }
            }
        }


        function clickHelp(d, i) {
            var rtl = (textDirection === 'rtl');
            pane.property('scrollTop', 0);
            doctitle.html(d.title);

            body.html(d.html);
            body.selectAll('a')
                .attr('target', '_blank');
            menuItems.classed('selected', function(m) {
                return m.title === d.title;
            });

            nav.html('');
            if (rtl) {
                nav.call(drawNext).call(drawPrevious);
            } else {
                nav.call(drawPrevious).call(drawNext);
            }


            function drawNext(selection) {
                if (i < docs.length - 1) {
                    var nextLink = selection
                        .append('a')
                        .attr('class', 'next')
                        .on('click', function() {
                            clickHelp(docs[i + 1], i + 1);
                        });

                    nextLink
                        .append('span')
                        .text(docs[i + 1].title)
                        .call(svgIcon((rtl ? '#icon-backward' : '#icon-forward'), 'inline'));
                }
            }


            function drawPrevious(selection) {
                if (i > 0) {
                    var prevLink = selection
                        .append('a')
                        .attr('class', 'previous')
                        .on('click', function() {
                            clickHelp(docs[i - 1], i - 1);
                        });

                    prevLink
                        .call(svgIcon((rtl ? '#icon-forward' : '#icon-backward'), 'inline'))
                        .append('span')
                        .text(docs[i - 1].title);
                }
            }
        }


        function clickWalkthrough() {
            if (context.inIntro()) return;
            context.container().call(uiIntro(context));
            setVisible(false);
        }


        function clickShortcuts() {
            context.container().call(uiShortcuts(context), true);
        }


        var pane = selection.append('div')
                .attr('class', 'help-wrap map-overlay fillL col5 content hide'),
            tooltipBehavior = tooltip()
                .placement((textDirection === 'rtl') ? 'right' : 'left')
                .html(true)
                .title(uiTooltipHtml(t('help.title'), key)),
            button = selection.append('button')
                .attr('tabindex', -1)
                .on('click', toggle)
                .call(svgIcon('#icon-help', 'light'))
                .call(tooltipBehavior),
            shown = false;


        var toc = pane.append('ul')
            .attr('class', 'toc');

        var menuItems = toc.selectAll('li')
            .data(docs)
            .enter()
            .append('li')
            .append('a')
            .html(function(d) { return d.title; })
            .on('click', clickHelp);

        var shortcuts = toc
            .append('li')
            .attr('class', 'shortcuts')
            .call(tooltip()
                .html(true)
                .title(uiTooltipHtml(t('shortcuts.tooltip'), '?'))
                .placement('top')
            )
            .append('a')
            .on('click', clickShortcuts);

        shortcuts
            .append('div')
            .text(t('shortcuts.title'));

        var walkthrough = toc
            .append('li')
            .attr('class', 'walkthrough')
            .append('a')
            .on('click', clickWalkthrough);

        walkthrough
            .append('svg')
            .attr('class', 'logo logo-walkthrough')
            .append('use')
            .attr('xlink:href', '#logo-walkthrough');

        walkthrough
            .append('div')
            .text(t('splash.walkthrough'));


        var content = pane.append('div')
            .attr('class', 'left-content');

        var doctitle = content.append('h2')
            .text(t('help.title'));

        var body = content.append('div')
            .attr('class', 'body');

        var nav = content.append('div')
            .attr('class', 'nav');

        clickHelp(docs[0], 0);

        var keybinding = d3_keybinding('help')
            .on(key, toggle)
            .on([t('background.key'), t('map_data.key')], hide);

        d3_select(document)
            .call(keybinding);

        context.surface().on('mousedown.help-outside', hide);
        context.container().on('mousedown.help-outside', hide);
    }

    return help;
}
