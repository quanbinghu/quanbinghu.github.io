$(function() {
	
	$('#toc .sectlevel1').hide();

	$('#toc').tocify({
          context: '#content',
        showAndHide:false,
          selectors: 'h2,h3,h4',
          showEffect: "fadeIn",
          scrollTo: 10
    });
	
	$('pre:has(code.language-sequence),pre:has(code.language-flow)').each(function(e, i) {
	  if ($(this).has('code.language-sequence').length) {
		var text = $(this).find('code').text();
		var sc = $('<div class="diagram"/>').text(text);
		$(this).replaceWith(sc);
		$(sc).sequenceDiagram({
		  theme: 'simple'
		})
	  } else {
		var text = $(this).find('code').text();
		var diagram = flowchart.parse(text);
		var fc = $('<div class="flowchart"/>');
		$(this).replaceWith(fc)
		diagram.drawSVG($(fc).get(0), {
		  'x': 0,
		  'y': 0,
		  'line-length': 50,
		  'text-margin': 10,
		  'font-color': 'black',
		  'line-color': '#555555',
		  'element-color': '#333333',
		  'fill': 'white',
		  'arrow-end': 'block',
		  // style symbol types
		  'symbols': {
			'start': {
			  'font-color': 'red',
			  'element-color': 'green',
			  'fill': 'yellow'
			},
			'end': {
			  'class': 'end-element'
			}
		  },
		  // even flowstate support ;-)
		  'flowstate': {
			'past': {
			  'fill': '#CCCCCC',
			  'font-size': 12
			},
			'current': {
			  'fill': 'yellow',
			  'font-color': 'red',
			  'font-weight': 'bold'
			},
			'future': {
			  'fill': '#FFFF99'
			},
			'request': {
			  'fill': 'blue'
			},
			'invalid': {
			  'fill': '#444444'
			},
			'approved': {
			  'fill': '#58C4A3',
			  'font-size': 12,
			  'yes-text': '通过',
			  'no-text': '拒绝'
			},
			'rejected': {
			  'fill': '#C45879',
			  'font-size': 12,
			  'yes-text': '通过',
			  'no-text': '拒绝'
			}
		  },
		  'line-width': 2,
		  'font-size': 14,
		  'font-family': 'Arial',
		  'yes-text': '是',
		  'no-text': '否'
		});
	  }
	});
	
	$('pre.highlight code').each(function(i, block) {
		hljs.highlightBlock(block);
	});
	
	
});